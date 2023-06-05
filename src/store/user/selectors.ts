import { createSelector } from "@reduxjs/toolkit";

import { equalNumberWithStringOrNumber } from "@coreUtils/utils";
import { User } from "@models/users/types";
import { RootState } from "@store/index";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const selectCurrentUserRole = createSelector([selectCurrentUser], (currentUser?: User) => currentUser?.userRole);

export const selectIsCurrentUserLoading = (state: RootState) => state.user.isCurrentUserLoading;

export const selectIsCurrentUserLoadingFailed = (state: RootState) => state.user.isCurrentUserLoadingFailed;

export const selectIsUpdatingCurrentUser = (state: RootState) => state.user.isUpdatingCurrentUser;

export const selectBanningCurrentUserId = (state: RootState) => state.user.banningCurrentUserId;

const selectUserId = (_state: RootState, userId?: string | number) => userId;

export const selectIsCurrentUserBanning = createSelector([selectBanningCurrentUserId, selectUserId], equalNumberWithStringOrNumber);
