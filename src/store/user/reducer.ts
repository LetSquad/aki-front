import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import { User, UserResponse } from "@models/users/types";

const UPDATE_USER_TOAST = (id: number) => `update-user-${id}`;

interface UserState {
    currentUser?: User;
    isCurrentUserLoading: boolean;
    isCurrentUserLoadingFailed: boolean;
    isUpdatingCurrentUser: boolean;
}

const initialState: UserState = {
    currentUser: undefined,
    isCurrentUserLoading: true,
    isCurrentUserLoadingFailed: false,
    isUpdatingCurrentUser: false
};

export const getUserRequest = createAsyncThunk("getUserRequest", async () => {
    const response: AxiosResponse<UserResponse> = await axios.get<UserResponse>(apiUrls.user());
    return response.data;
});

export const updateUserRequest = createAsyncThunk("updateUserRequest", async ({ userImage, ...data }: User) => {
    const formData = new FormData();
    if (userImage && typeof userImage === "object") {
        formData.append("image", userImage);
    }

    formData.append("user", new Blob([
        JSON.stringify(typeof userImage === "string" ? { ...data, userImage } : data)
    ], { type: "application/json" }));

    const response: AxiosResponse<UserResponse> = await axios.put<UserResponse>(apiUrls.user(), formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserRequest.pending, (state) => {
            state.isCurrentUserLoading = true;
            state.isCurrentUserLoadingFailed = false;
            state.currentUser = undefined;
        });
        builder.addCase(getUserRequest.rejected, (state) => {
            state.isCurrentUserLoading = false;
            state.isCurrentUserLoadingFailed = true;
        });
        builder.addCase(getUserRequest.fulfilled, (state, action) => {
            state.isCurrentUserLoading = false;
            state.currentUser = action.payload.dataBlock;
        });
        builder.addCase(updateUserRequest.pending, (state, action) => {
            toast.loading("Информация о вашем профиле обновляется", { id: UPDATE_USER_TOAST(action.meta.arg.id) });
            state.isUpdatingCurrentUser = true;
        });
        builder.addCase(updateUserRequest.rejected, (state, action) => {
            state.isUpdatingCurrentUser = false;
            toast.error("При обновлении информации о вашем профиле произошла ошибка. Повторите обновление позже", {
                id: UPDATE_USER_TOAST(action.meta.arg.id)
            });
        });
        builder.addCase(updateUserRequest.fulfilled, (state, action) => {
            state.isUpdatingCurrentUser = false;
            state.currentUser = action.payload.dataBlock;
            toast.success("Информация о вашем профиле обновлена успешно", { id: UPDATE_USER_TOAST(action.meta.arg.id) });
        });
    }
});

export default userSlice.reducer;
