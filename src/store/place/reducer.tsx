import { RefObject } from "react";

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import AddPlaceSuccessToast from "@components/Place/AddPlace/AddPlaceSuccessToast";
import { parseParams } from "@coreUtils/utils";
import { BasePageRequest } from "@models/http/types";
import {
    Place,
    PlaceAddFormValues,
    PlaceDetailsFormRef,
    PlaceResponse,
    PlacesFiltersFormValues,
    PlacesResponse,
    PlacesSortRequest,
    PlaceUpdateFormValues
} from "@models/places/types";
import { createRentRequest } from "@store/rent/reducer";
import { cancelRentSlotsRequest, createRentSlotsRequest } from "@store/rentSlot/reducer";

const ADD_PLACE_TOAST_NAME = (placeName: string) => `add-place-${placeName}`;
const DELETE_PLACE_TOAST_ID = (placeId: number) => `delete-place-${placeId}`;
const UPDATE_PLACE_TOAST_ID = (placeId: number) => `update-place-${placeId}`;
const BAN_PLACE_TOAST_ID = (placeId: number) => `ban-place-${placeId}`;
const APPROVE_PLACE_TOAST_ID = (placeId: number) => `approve-place-${placeId}`;
const ADD_FAVORITE_PLACE_TOAST_ID = (placeId: number) => `add-favorite-place-${placeId}`;
const REMOVE_FAVORITE_PLACE_TOAST_ID = (placeId: number) => `remove-favorite-place-${placeId}`;

interface PlaceState {
    places: Place[];
    placesCurrentPage: number;
    placesTotalPages?: number,
    isPlacesLoading: boolean;
    isPlacesLoadingFailed: boolean;
    userPlaces: Place[];
    userPlacesCurrentPage: number;
    userPlacesTotalPages?: number,
    isUserPlacesLoading: boolean;
    isUserPlacesLoadingFailed: boolean;
    currentPlace?: Place;
    isCurrentPlaceLoading: boolean;
    isCurrentPlaceLoadingFailed: boolean;
    isPlaceAdding: boolean;
    isUpdatingCurrentPlace: boolean;
    deletingCurrentPlaceId?: number;
    banningCurrentPlaceId?: number;
    approvingCurrentPlaceId?: number;
    favoritePlaceId?: number;
}

const initialState: PlaceState = {
    places: [],
    placesCurrentPage: 1,
    placesTotalPages: undefined,
    isPlacesLoading: true,
    isPlacesLoadingFailed: false,
    userPlaces: [],
    userPlacesCurrentPage: 1,
    userPlacesTotalPages: undefined,
    isUserPlacesLoading: true,
    isUserPlacesLoadingFailed: false,
    currentPlace: undefined,
    isPlaceAdding: false,
    isCurrentPlaceLoading: true,
    isCurrentPlaceLoadingFailed: false,
    isUpdatingCurrentPlace: false,
    deletingCurrentPlaceId: undefined,
    banningCurrentPlaceId: undefined,
    approvingCurrentPlaceId: undefined,
    favoritePlaceId: undefined
};

export const getPlacesRequest = createAsyncThunk("getPlacesRequest", async (params: BasePageRequest & PlacesFiltersFormValues & PlacesSortRequest) => {
    const { data } = await axios.get<PlacesResponse>(apiUrls.place(), { params, paramsSerializer: parseParams });
    return data;
});

export const getUserPlacesRequest = createAsyncThunk("getUserPlacesRequest", async (params: BasePageRequest) => {
    const { data } = await axios.get<PlacesResponse>(apiUrls.myPlace(), { params });
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
        coordinates,
        ...place
    }: PlaceAddFormValues & { addPlaceFormRef: RefObject<PlaceDetailsFormRef> }) => {
        const formData = new FormData();

        if (placeImages) {
            for (const [index, placeImage] of placeImages.entries()) {
                formData.append(`image_${index}`, placeImage);
            }
        }

        let numberCoordinates;
        if (coordinates) {
            numberCoordinates = {
                longitude: typeof coordinates.longitude === "string" ? Number.parseFloat(coordinates.longitude) : coordinates.longitude,
                latitude: typeof coordinates.latitude === "string" ? Number.parseFloat(coordinates.latitude) : coordinates.latitude
            };
        }

        formData.append(
            "place",
            new Blob([JSON.stringify({ ...place, coordinates: numberCoordinates })], {
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
                placeOldImages.push(placeImage as string);
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
    const { data } = await axios.delete(apiUrls.placeId(placeId));
    return data;
});

export const banPlaceRequest = createAsyncThunk("banPlaceRequest", async (
    { placeId, banReason }: { placeId: number; banReason?: string; placeName: string }
) => {
    const { data } = await axios.post<PlaceResponse>(apiUrls.placeBan(), { data: { id: placeId, banReason } });
    return data;
});

export const approvePlaceRequest = createAsyncThunk("approvePlaceRequest", async (
    { placeId }: { placeId: number; placeName: string }
) => {
    const { data } = await axios.post<PlaceResponse>(apiUrls.placeApprove(placeId));
    return data;
});

export const addFavoritePlaceRequest = createAsyncThunk("addFavoritePlaceRequest", async (
    { placeId }: { placeId: number; }
) => {
    const { data } = await axios.post<PlaceResponse>(apiUrls.placeFavorite(placeId));
    return data;
});

export const removeFavoritePlaceRequest = createAsyncThunk("removeFavoritePlaceRequest", async (
    { placeId }: { placeId: number; }
) => {
    const { data } = await axios.delete<PlaceResponse>(apiUrls.placeFavorite(placeId));
    return data;
});

export const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlacesRequest.pending, (state, action) => {
            if (action.meta.arg.pageNumber === 1) {
                state.places = [];
            }
            state.isPlacesLoading = true;
            state.isPlacesLoadingFailed = false;
        });
        builder.addCase(getPlacesRequest.fulfilled, (state, action) => {
            state.places = action.meta.arg.pageNumber === state.placesCurrentPage || action.meta.arg.pageNumber === 1
                ? action.payload.places
                : [...state.places, ...action.payload.places];
            state.placesTotalPages = action.payload.total;
            state.isPlacesLoading = false;
        });
        builder.addCase(getPlacesRequest.rejected, (state) => {
            state.isPlacesLoading = false;
            state.isPlacesLoadingFailed = true;
        });
        builder.addCase(getUserPlacesRequest.pending, (state) => {
            state.isUserPlacesLoading = true;
            state.isUserPlacesLoadingFailed = false;
        });
        builder.addCase(getUserPlacesRequest.fulfilled, (state, action) => {
            state.userPlaces = action.meta.arg.pageNumber === state.userPlacesCurrentPage
                ? action.payload.places
                : [...state.userPlaces, ...action.payload.places];
            state.userPlacesTotalPages = action.payload.total;
            state.isUserPlacesLoading = false;
        });
        builder.addCase(getUserPlacesRequest.rejected, (state) => {
            state.isUserPlacesLoading = false;
            state.isUserPlacesLoadingFailed = true;
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
                        createdPlaceId={action.payload.id}
                        createdPlaceName={action.payload.name}
                    />
                ),
                { id: ADD_PLACE_TOAST_NAME(action.payload.name), duration: 120_000 }
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
            state.isCurrentPlaceLoading = false;
            state.isCurrentPlaceLoadingFailed = true;
        });
        builder.addCase(getPlaceRequest.fulfilled, (state, action) => {
            state.isCurrentPlaceLoading = false;
            state.currentPlace = action.payload;
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
            state.currentPlace = action.payload;
            toast.success(`Информация о площадке ${action.meta.arg.name} обновлена успешно. Обновление передано на проверку модератору и очень скоро ее проверят`, {
                id: UPDATE_PLACE_TOAST_ID(action.meta.arg.id)
            });
        });
        builder.addCase(banPlaceRequest.pending, (state, action) => {
            toast.loading(`Площадка ${action.meta.arg.placeName} банится`, {
                id: BAN_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
            state.banningCurrentPlaceId = action.meta.arg.placeId;
        });
        builder.addCase(banPlaceRequest.rejected, (state, action) => {
            state.banningCurrentPlaceId = undefined;
            toast.error(`При бане площадки ${action.meta.arg.placeName} произошла ошибка. Повторите бан позже`, {
                id: BAN_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(banPlaceRequest.fulfilled, (state, action) => {
            state.banningCurrentPlaceId = undefined;
            state.currentPlace = action.payload;
            toast.success(`Площадка ${action.meta.arg.placeName} успешно забанена`, {
                id: BAN_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(approvePlaceRequest.pending, (state, action) => {
            toast.loading(`Площадка ${action.meta.arg.placeName} подтверждается`, {
                id: APPROVE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
            state.approvingCurrentPlaceId = action.meta.arg.placeId;
        });
        builder.addCase(approvePlaceRequest.rejected, (state, action) => {
            state.approvingCurrentPlaceId = undefined;
            toast.error(`При подтверждении площадки ${action.meta.arg.placeName} произошла ошибка. Повторите подтверждение позже`, {
                id: APPROVE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(approvePlaceRequest.fulfilled, (state, action) => {
            state.approvingCurrentPlaceId = undefined;
            state.currentPlace = action.payload;
            toast.success(`Площадка ${action.meta.arg.placeName} успешно подтверждена`, {
                id: APPROVE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(addFavoritePlaceRequest.pending, (state, action) => {
            toast.loading("Добавляем площадку в избранное", {
                id: ADD_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
            if (state.currentPlace?.id === action.meta.arg.placeId) {
                state.currentPlace.favorite = true;
            }
            state.places = state.places
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: true } : place));
            state.userPlaces = state.userPlaces
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: true } : place));
            state.favoritePlaceId = action.meta.arg.placeId;
        });
        builder.addCase(addFavoritePlaceRequest.rejected, (state, action) => {
            if (state.currentPlace?.id === action.meta.arg.placeId) {
                state.currentPlace.favorite = false;
            }
            state.places = state.places
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: false } : place));
            state.userPlaces = state.userPlaces
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: false } : place));
            state.favoritePlaceId = undefined;
            toast.error("При добавлении площадки в избранное произошла ошибка. Повторите попытку позже", {
                id: ADD_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(addFavoritePlaceRequest.fulfilled, (state, action) => {
            state.favoritePlaceId = undefined;
            toast.success("Площадка добавлена в избранное", {
                id: ADD_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(removeFavoritePlaceRequest.pending, (state, action) => {
            toast.loading("Удаляем площадку из избранного", {
                id: REMOVE_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
            if (state.currentPlace?.id === action.meta.arg.placeId) {
                state.currentPlace.favorite = false;
            }
            state.places = state.places
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: false } : place));
            state.userPlaces = state.userPlaces
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: false } : place));
            state.favoritePlaceId = action.meta.arg.placeId;
        });
        builder.addCase(removeFavoritePlaceRequest.rejected, (state, action) => {
            if (state.currentPlace?.id === action.meta.arg.placeId) {
                state.currentPlace.favorite = true;
            }
            state.places = state.places
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: true } : place));
            state.userPlaces = state.userPlaces
                .map((place) => (place.id === action.meta.arg.placeId ? { ...place, favorite: true } : place));
            state.favoritePlaceId = undefined;
            toast.error("При удалении площадки из избранного произошла ошибка. Повторите попытку позже", {
                id: REMOVE_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(removeFavoritePlaceRequest.fulfilled, (state, action) => {
            state.favoritePlaceId = undefined;
            toast.success("Площадка удалена из избранного", {
                id: REMOVE_FAVORITE_PLACE_TOAST_ID(action.meta.arg.placeId)
            });
        });
        builder.addCase(createRentRequest.fulfilled, (state, action) => {
            if (state.currentPlace && state.currentPlace.id === action.payload.place.id) {
                state.currentPlace.rentSlots = state.currentPlace.rentSlots?.map((rentSlot) => action.payload.rentSlots
                    .find((_rentSlot) => _rentSlot.id === rentSlot.id) ?? rentSlot);
            }

            const placeForEdit = state.places.find((place) => place.id === action.payload.place.id);
            if (placeForEdit) {
                placeForEdit.rentSlots = placeForEdit.rentSlots?.map((rentSlot) => action.payload.rentSlots
                    .find((_rentSlot) => _rentSlot.id === rentSlot.id) ?? rentSlot);
            }

            const userPlaceForEdit = state.userPlaces.find((place) => place.id === action.payload.place.id);
            if (userPlaceForEdit) {
                userPlaceForEdit.rentSlots = userPlaceForEdit.rentSlots?.map((rentSlot) => action.payload.rentSlots
                    .find((_rentSlot) => _rentSlot.id === rentSlot.id) ?? rentSlot);
            }
        });
        builder.addMatcher(isAnyOf(createRentSlotsRequest.fulfilled, cancelRentSlotsRequest.fulfilled), (state, action) => {
            state.currentPlace = action.payload;
        });
    }
});

export default placeSlice.reducer;
