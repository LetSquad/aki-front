import { createSelector } from "@reduxjs/toolkit";

import { equalNumberWithStringOrNumber } from "@coreUtils/utils";
import { RootState } from "@store/index";

export const selectPlaces = (state: RootState) => state.place.places;

export const selectIsPlacesLoading = (state: RootState) => state.place.isPlacesLoading;

export const selectIsPlacesLoadingFailed = (state: RootState) => state.place.isPlacesLoadingFailed;

export const selectCurrentPlace = (state: RootState) => state.place.currentPlace;

export const selectIsCurrentPlaceLoading = (state: RootState) => state.place.isCurrentPlaceLoading;

export const selectIsCurrentPlaceLoadingFailed = (state: RootState) => state.place.isCurrentPlaceLoadingFailed;

export const selectIsUpdatingCurrentPlace = (state: RootState) => state.place.isUpdatingCurrentPlace;

export const selectDeletingCurrentPlaceId = (state: RootState) => state.place.deletingCurrentPlaceId;

export const selectIsPlaceAdding = (state: RootState) => state.place.isPlaceAdding;

const selectPlaceId = (_state: RootState, petId?: string | number) => petId;

export const selectIsCurrentPlaceDeleting = createSelector([selectDeletingCurrentPlaceId, selectPlaceId], equalNumberWithStringOrNumber);
