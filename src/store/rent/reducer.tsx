import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import { BasePageRequest } from "@models/http/types";
import { Place } from "@models/places/types";
import {
    NewRentRequest,
    Rent,
    RentResponse,
    RentsResponse
} from "@models/rent/types";

const CANCEL_RENT_TOAST = (rentId: number) => `cancel-rent-${rentId}`;
const ADD_RENT_TOAST = (placeId: number) => `add-rent-${placeId}`;

interface RentState {
    currentRentPlace?: Place;
    rents: Rent[];
    rentsCurrentPage: number;
    rentsTotalPages?: number,
    isRentsLoading: boolean;
    isRentsLoadingFailed: boolean;
    isNewRentAdding: boolean;
    cancelRentId?: number;
    ratingRentId?: number;
}

const initialState: RentState = {
    currentRentPlace: undefined,
    rents: [],
    rentsCurrentPage: 1,
    rentsTotalPages: undefined,
    isRentsLoading: true,
    isRentsLoadingFailed: false,
    isNewRentAdding: false,
    cancelRentId: undefined,
    ratingRentId: undefined
};

export const getRentsRequest = createAsyncThunk("getRentsRequest", async (params: BasePageRequest) => {
    const { data } = await axios.get<RentsResponse>(apiUrls.rents(), { params });
    return data;
});

export const createRentRequest = createAsyncThunk("createRentRequest", async ({ placeId, rentSlotIds }: NewRentRequest & {
    placeName: string;
}) => {
    const { data } = await axios.post<RentResponse>(
        apiUrls.rents(),
        { placeId, rentSlotIds }
    );

    return data;
});

export const cancelRentRequest = createAsyncThunk(
    "cancelRentRequest",
    async ({ rentId }: { rentId: number, placeName: string }) => {
        const { data } = await axios.delete<RentResponse>(
            apiUrls.rents(),
            { data: { rentId } }
        );
        return data;
    }
);

export const rateRentRequest = createAsyncThunk(
    "rateRentRequest",
    async ({ rentId, rating }: {
        rentId: number;
        rating: number;
        placeName: string;
    }) => {
        const { data } = await axios.post<RentResponse>(
            apiUrls.rentRate(),
            undefined,
            {
                params: {
                    rentId,
                    rating
                }
            }
        );

        return data;
    }
);

export const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setCurrentRentPlace: (state, action: PayloadAction<Place | undefined>) => {
            state.currentRentPlace = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRentsRequest.pending, (state, action) => {
            if (action.meta.arg.pageNumber === 1) {
                state.rents = [];
            }
            state.isRentsLoading = true;
            state.isRentsLoadingFailed = false;
        });
        builder.addCase(getRentsRequest.fulfilled, (state, action) => {
            state.rents = action.meta.arg.pageNumber === state.rentsCurrentPage || action.meta.arg.pageNumber === 1
                ? action.payload.rents
                : [...state.rents, ...action.payload.rents];
            state.rentsTotalPages = action.payload.total;
            state.isRentsLoading = false;
        });
        builder.addCase(getRentsRequest.rejected, (state) => {
            state.isRentsLoading = false;
            state.isRentsLoadingFailed = true;
        });
        builder.addCase(cancelRentRequest.pending, (state, action) => {
            toast.loading(
                `Отменяем аренду на площадку "${action.meta.arg.placeName}"`,
                { id: CANCEL_RENT_TOAST(action.meta.arg.rentId) }
            );
            state.cancelRentId = action.meta.arg.rentId;
        });
        builder.addCase(cancelRentRequest.rejected, (state, action) => {
            toast.error(
                `При отмене аренды на площадку "${action.meta.arg.placeName}" произошла ошибка. Повторите отмену позже`,
                { id: CANCEL_RENT_TOAST(action.meta.arg.rentId) }
            );
            state.cancelRentId = undefined;
        });
        builder.addCase(cancelRentRequest.fulfilled, (state, action) => {
            toast.success(
                `Аренда площадки "${action.meta.arg.placeName}" отменена`,
                { id: CANCEL_RENT_TOAST(action.meta.arg.rentId) }
            );
            state.cancelRentId = undefined;
            state.rents = state.rents.map((rent) => (rent.id === action.payload.id ? action.payload : rent));
        });
        builder.addCase(rateRentRequest.pending, (state, action) => {
            state.ratingRentId = action.meta.arg.rentId;
        });
        builder.addCase(rateRentRequest.rejected, (state, action) => {
            toast.error(`При оценке бронирования площадки "${action.meta.arg.placeName}" произошла ошибка. Повторите оценку позже`);
            state.ratingRentId = undefined;
        });
        builder.addCase(rateRentRequest.fulfilled, (state, action) => {
            state.ratingRentId = undefined;
            state.rents = state.rents.map((rent) => (rent.id === action.payload.id ? action.payload : rent));
        });
        builder.addCase(createRentRequest.pending, (state, action) => {
            toast.loading(
                `Бронируем площадку "${action.meta.arg.placeName}"`,
                { id: ADD_RENT_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentAdding = true;
        });
        builder.addCase(createRentRequest.rejected, (state, action) => {
            toast.error(
                `При бронировании площадки "${action.meta.arg.placeName}" произошла ошибка. Повторите бронирование позже`,
                { id: ADD_RENT_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentAdding = false;
        });
        builder.addCase(createRentRequest.fulfilled, (state, action) => {
            toast.success(
                `Площадка "${action.meta.arg.placeName}" успешно забронирована. Скоро вам на электронную почту придет подтверждение о бронировании!`,
                { id: ADD_RENT_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentAdding = false;
        });
    }
});

export default rentSlice.reducer;
export const { setCurrentRentPlace } = rentSlice.actions;
