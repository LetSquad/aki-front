import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $enum } from "ts-enum-util";

import { UserRole } from "@models/users/enums";

interface InfoState {
    auth: boolean;
    role?: UserRole;
    isLoginOpen: boolean;
}

const storageRole = localStorage.getItem("aki_role");

const params = new URL(document.location.href).searchParams;
const isActivation = params.get("activation");

const initialState: InfoState = {
    auth: true,
    role: storageRole && storageRole !== "undefined" && storageRole !== "null"
        ? $enum(UserRole).asValueOrDefault(JSON.parse(storageRole))
        : undefined,
    isLoginOpen: !!isActivation
};

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        },
        setRole: (state, action: PayloadAction<UserRole | undefined>) => {
            state.role = action.payload;
        },
        setIsLoginOpen: (state, action: PayloadAction<boolean>) => {
            state.isLoginOpen = action.payload;
        }
    }
});

export const { setAuth, setRole, setIsLoginOpen } = infoSlice.actions;

export default infoSlice.reducer;
