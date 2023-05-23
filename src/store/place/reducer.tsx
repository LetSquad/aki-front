import { RefObject } from "react";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import AddPlaceSuccessToast from "@components/Place/AddPlace/AddPlaceSuccessToast";
import {
    Place,
    PlaceAddFormValues,
    PlaceDetailsFormRef,
    PlaceResponse,
    PlacesResponse,
    PlaceUpdateFormValues
} from "@models/places/types";
import { BaseResponse } from "@models/responses/types";

const ADD_PLACE_TOAST_NAME = (placeName: string) => `add-place-${placeName}`;
const DELETE_PLACE_TOAST_ID = (placeId: number) => `delete-place-${placeId}`;
const UPDATE_PLACE_TOAST_ID = (placeId: number) => `update-place-${placeId}`;

interface PlaceState {
    places: Place[];
    isPlacesLoading: boolean;
    isPlacesLoadingFailed: boolean;
    currentPlace?: Place;
    isPlaceAdding: boolean;
    isCurrentPlaceLoading: boolean;
    isCurrentPlaceLoadingFailed: boolean;
    isUpdatingCurrentPlace: boolean;
    deletingCurrentPlaceId?: number;
}

const initialState: PlaceState = {
    places: [],
    isPlacesLoading: true,
    isPlacesLoadingFailed: false,
    currentPlace: undefined,
    isPlaceAdding: false,
    isCurrentPlaceLoading: true,
    isCurrentPlaceLoadingFailed: false,
    isUpdatingCurrentPlace: false,
    deletingCurrentPlaceId: undefined
};

export const getPlacesRequest = createAsyncThunk("getPlacesRequest", async () => {
    const { data } = await axios.get<PlacesResponse>(apiUrls.place());
    return data;
});

export const getPlaceRequest = createAsyncThunk("getPlaceRequest", async (placeId: string) => {
    const { data } = await axios.get<PlaceResponse>(apiUrls.placeId(placeId));
    return data;
});

export const addPlaceRequest = createAsyncThunk(
    "addPlaceRequest",
    async ({
        placeImages,
        addPlaceFormRef: _addPlaceFormRef,
        ...place
    }: PlaceAddFormValues & { addPlaceFormRef: RefObject<PlaceDetailsFormRef> }) => {
        const formData = new FormData();

        if (placeImages) {
            for (const [index, placeImage] of placeImages.entries()) {
                formData.append(`image_${index}`, placeImage);
            }
        }

        formData.append(
            "place",
            new Blob([JSON.stringify(place)], {
                type: "application/json"
            })
        );

        const { data } = await axios.post<PlaceResponse>(apiUrls.place(), formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    }
);

export const updatePlaceRequest = createAsyncThunk("updatePlaceRequest", async ({ placeImages, ...data }: PlaceUpdateFormValues) => {
    const formData = new FormData();
    const placeOldImages: string[] = [];
    if (placeImages) {
        for (const [index, placeImage] of placeImages.entries()) {
            if (placeImage && typeof placeImage === "object") {
                formData.append(`image_${index}`, placeImage);
            } else {
                placeOldImages.push(placeImage);
            }
        }
    }

    formData.append("place", new Blob([
        JSON.stringify({ ...data, placeImages: placeOldImages })
    ], { type: "application/json" }));

    const { data: responseData } = await axios.put<PlaceResponse>(apiUrls.place(), formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return responseData;
});

export const deletePlaceRequest = createAsyncThunk("deletePlaceRequest", async ({ placeId }: { placeId: number; placeName: string }) => {
    const { data } = await axios.delete<BaseResponse>(apiUrls.placeId(placeId));
    return data;
});

export const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlacesRequest.pending, (state) => {
            state.places = [];
            state.isPlacesLoading = true;
            state.isPlacesLoadingFailed = false;
        });
        builder.addCase(getPlacesRequest.fulfilled, (state, action) => {
            state.places = action.payload.dataBlock;
            state.isPlacesLoading = false;
        });
        builder.addCase(getPlacesRequest.rejected, (state) => {
            state.isPlacesLoading = false;
            state.isPlacesLoadingFailed = true;
        });
        builder.addCase(addPlaceRequest.pending, (state, action) => {
            state.isPlaceAdding = true;
            toast.loading(`Новая площадка ${action.meta.arg.name} добавляется`, { id: ADD_PLACE_TOAST_NAME(action.meta.arg.name) });
        });
        builder.addCase(addPlaceRequest.rejected, (state, action) => {
            state.isPlaceAdding = false;
            toast.error(`Произошла ошибка при добавлении площадки ${action.meta.arg.name}`, {
                id: ADD_PLACE_TOAST_NAME(action.meta.arg.name)
            });
        });
        builder.addCase(addPlaceRequest.fulfilled, (state, action) => {
            state.isPlaceAdding = false;
            action.meta.arg.addPlaceFormRef.current?.resetForm();
            toast.custom(
                (t: Toast) => (
                    <AddPlaceSuccessToast
                        toast={t}
                        createdPlaceId={action.payload.dataBlock.id}
                        createdPlaceName={action.payload.dataBlock.name}
                    />
                ),
                { id: ADD_PLACE_TOAST_NAME(action.payload.dataBlock.name), duration: 120_000 }
            );
        });
        builder.addCase(deletePlaceRequest.pending, (state, action) => {
            toast.loading(`Информация о площадке ${action.meta.arg.placeName} удаляется`, {
                id: DELETE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
            state.deletingCurrentPlaceId = action.meta.arg.placeId;
        });
        builder.addCase(deletePlaceRequest.rejected, (state, action) => {
            state.deletingCurrentPlaceId = undefined;
            toast.error(`При удалении информации о площадке ${action.meta.arg.placeName} произошла ошибка. Повторите удаление позже`, {
                id: DELETE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(deletePlaceRequest.fulfilled, (state, action) => {
            state.places = state.places.filter((place) => place.id !== action.meta.arg.placeId);
            state.deletingCurrentPlaceId = undefined;
            toast.success(`Информация о площадке ${action.meta.arg.placeName} удалена успешно`, {
                id: DELETE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(getPlaceRequest.pending, (state) => {
            state.isCurrentPlaceLoading = true;
            state.isCurrentPlaceLoadingFailed = false;
            state.currentPlace = undefined;
        });
        builder.addCase(getPlaceRequest.rejected, (state) => {
            // TODO: нужен отдельный код ошибки, если площадка с переданным id не найдена
            state.isCurrentPlaceLoading = false;
            state.isCurrentPlaceLoadingFailed = true;
        });
        builder.addCase(getPlaceRequest.fulfilled, (state, action) => {
            state.isCurrentPlaceLoading = false;
            state.currentPlace = action.payload.dataBlock;
        });
        builder.addCase(updatePlaceRequest.pending, (state, action) => {
            toast.loading(`Информация о площадке ${action.meta.arg.name} обновляется`, {
                id: UPDATE_PLACE_TOAST_ID(action.meta.arg.id)
            });
            state.isUpdatingCurrentPlace = true;
        });
        builder.addCase(updatePlaceRequest.rejected, (state, action) => {
            state.isUpdatingCurrentPlace = false;
            toast.error(`При обновлении информации о площадке ${action.meta.arg.name} произошла ошибка. Повторите обновление позже`, {
                id: UPDATE_PLACE_TOAST_ID(action.meta.arg.id)
            });
        });
        builder.addCase(updatePlaceRequest.fulfilled, (state, action) => {
            state.isUpdatingCurrentPlace = false;
            state.currentPlace = action.payload.dataBlock;
            toast.success(`Информация о площадке ${action.meta.arg.name} обновлена успешно. Обновление передано на проверку модератору и очень скоро ее проверят`, {
                id: UPDATE_PLACE_TOAST_ID(action.meta.arg.id)
            });
        });
    }
});

export default placeSlice.reducer;
