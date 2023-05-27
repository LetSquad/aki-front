import { createSelector } from "@reduxjs/toolkit";

import { equalNumberWithStringOrNumber } from "@coreUtils/utils";
import { RootState } from "@store/index";

export const selectCurrentRentPlace = (state: RootState) => state.rent.currentRentPlace;

export const selectRents = (state: RootState) => state.rent.rents;
export const selectIsRentsLoading = (state: RootState) => state.rent.isRentsLoading;
export const selectIsRentsLoadingFailed = (state: RootState) => state.rent.isRentsLoadingFailed;
export const selectRentsTotalPages = (state: RootState) => state.rent.rentsTotalPages;

export const selectCancelRentId = (state: RootState) => state.rent.cancelRentId;
export const selectRatingRentId = (state: RootState) => state.rent.ratingRentId;

const selectRentId = (_state: RootState, rentId?: string | number) => rentId;

export const selectIsRentCancelling = createSelector(
    [selectCancelRentId, selectRentId],
    equalNumberWithStringOrNumber
);

export const selectIsRentRating = createSelector(
    [selectRatingRentId, selectRentId],
    equalNumberWithStringOrNumber
);

export const selectIsNewRentAdding = (state: RootState) => state.rent.isNewRentAdding;
