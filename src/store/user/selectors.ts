import { RootState } from "@store/index";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const selectIsCurrentUserLoading = (state: RootState) => state.user.isCurrentUserLoading;

export const selectIsCurrentUserLoadingFailed = (state: RootState) => state.user.isCurrentUserLoadingFailed;

export const selectIsUpdatingCurrentUser = (state: RootState) => state.user.isUpdatingCurrentUser;
