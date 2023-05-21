import { createSelector } from "@reduxjs/toolkit";

import { equalNumberWithStringOrNumber } from "@coreUtils/utils";
import { RootState } from "@store/index";

export const selectAreas = (state: RootState) => state.area.areas;

export const selectIsAreasLoading = (state: RootState) => state.area.isAreasLoading;

export const selectIsAreasLoadingFailed = (state: RootState) => state.area.isAreasLoadingFailed;

export const selectCurrentArea = (state: RootState) => state.area.currentArea;

export const selectIsCurrentAreaLoading = (state: RootState) => state.area.isCurrentAreaLoading;

export const selectIsCurrentAreaLoadingFailed = (state: RootState) => state.area.isCurrentAreaLoadingFailed;

export const selectIsUpdatingCurrentArea = (state: RootState) => state.area.isUpdatingCurrentArea;

export const selectDeletingCurrentAreaId = (state: RootState) => state.area.deletingCurrentAreaId;

export const selectIsAreaAdding = (state: RootState) => state.area.isAreaAdding;

const selectAreaId = (_state: RootState, petId?: string | number) => petId;

export const selectIsCurrentAreaDeleting = createSelector([selectDeletingCurrentAreaId, selectAreaId], equalNumberWithStringOrNumber);
