import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store/index";

export const selectIsUserAuth = (state: RootState) => state.info.auth;

export const selectUserRole = (state: RootState) => state.info.role;

export const selectIsUserNotAuth = createSelector(
    [selectIsUserAuth, selectUserRole],
    (auth, role) => (
        !auth || !role
    )
);

export const selectIsLoginOpen = (state: RootState) => state.info.isLoginOpen;
