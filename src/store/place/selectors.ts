import { createSelector } from "@reduxjs/toolkit";

import { equalNumberWithStringOrNumber } from "@coreUtils/utils";
import { RootState } from "@store/index";

export const selectPlaces = (state: RootState) => state.place.places;

export const selectPlacesTotalPages = (state: RootState) => state.place.placesTotalPages;

export const selectIsPlacesLoading = (state: RootState) => state.place.isPlacesLoading;

export const selectIsPlacesLoadingFailed = (state: RootState) => state.place.isPlacesLoadingFailed;

export const selectUserPlaces = (state: RootState) => state.place.userPlaces;

export const selectUserPlacesTotalPages = (state: RootState) => state.place.userPlacesTotalPages;

export const selectIsUserPlacesLoading = (state: RootState) => state.place.isUserPlacesLoading;

export const selectIsUserPlacesLoadingFailed = (state: RootState) => state.place.isUserPlacesLoadingFailed;

export const selectCurrentPlace = (state: RootState) => state.place.currentPlace;

export const selectIsCurrentPlaceLoading = (state: RootState) => state.place.isCurrentPlaceLoading;

export const selectIsCurrentPlaceLoadingFailed = (state: RootState) => state.place.isCurrentPlaceLoadingFailed;

export const selectIsUpdatingCurrentPlace = (state: RootState) => state.place.isUpdatingCurrentPlace;

export const selectIsPlaceAdding = (state: RootState) => state.place.isPlaceAdding;
export const selectDeletingCurrentPlaceId = (state: RootState) => state.place.deletingCurrentPlaceId;
export const selectBanningCurrentPlaceId = (state: RootState) => state.place.banningCurrentPlaceId;
export const selectApprovingCurrentPlaceId = (state: RootState) => state.place.approvingCurrentPlaceId;

const selectPlaceId = (_state: RootState, placeId?: string | number) => placeId;

export const selectIsCurrentPlaceDeleting = createSelector([selectDeletingCurrentPlaceId, selectPlaceId], equalNumberWithStringOrNumber);
export const selectIsCurrentPlaceBanning = createSelector([selectBanningCurrentPlaceId, selectPlaceId], equalNumberWithStringOrNumber);
export const selectIsCurrentPlaceApproving = createSelector([selectApprovingCurrentPlaceId, selectPlaceId], equalNumberWithStringOrNumber);
