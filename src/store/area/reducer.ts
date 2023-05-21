import { RefObject } from "react";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import {
    Area,
    AreaAddFormValues,
    AreaDetailFormRef,
    AreaResponse,
    AreasResponse,
    AreaUpdateFormValues
} from "@models/areas/types";
import { BaseResponse } from "@models/responses/types";

const ADD_AREA_TOAST_NAME = (areaName: string) => `add-area-${areaName}`;
const DELETE_AREA_TOAST_ID = (areaId: number) => `delete-area-${areaId}`;
const UPDATE_AREA_TOAST_ID = (areaId: number) => `update-area-${areaId}`;

interface AreaState {
    areas: Area[];
    isAreasLoading: boolean;
    isAreasLoadingFailed: boolean;
    currentArea?: Area;
    isAreaAdding: boolean;
    isCurrentAreaLoading: boolean;
    isCurrentAreaLoadingFailed: boolean;
    isUpdatingCurrentArea: boolean;
    deletingCurrentAreaId?: number;
}

const initialState: AreaState = {
    areas: [],
    isAreasLoading: true,
    isAreasLoadingFailed: false,
    currentArea: undefined,
    isAreaAdding: false,
    isCurrentAreaLoading: true,
    isCurrentAreaLoadingFailed: false,
    isUpdatingCurrentArea: false,
    deletingCurrentAreaId: undefined
};

export const getAreasRequest = createAsyncThunk("getAreasRequest", async () => {
    const { data } = await axios.get<AreasResponse>(apiUrls.area());
    return data;
});

export const getAreaRequest = createAsyncThunk("getAreaRequest", async (areaId: string) => {
    const { data } = await axios.get<AreaResponse>(apiUrls.areaId(areaId));
    return data;
});

export const addAreaRequest = createAsyncThunk(
    "addAreaRequest",
    async ({
        areaImages,
        addAreaFormRef: _addAreaFormRef,
        ...area
    }: AreaAddFormValues & { addAreaFormRef: RefObject<AreaDetailFormRef> }) => {
        const formData = new FormData();

        if (areaImages) {
            for (const [index, areaImage] of areaImages.entries()) {
                formData.append(`image_${index}`, areaImage);
            }
        }

        formData.append(
            "area",
            new Blob([JSON.stringify(area)], {
                type: "application/json"
            })
        );

        const { data } = await axios.post<AreaResponse>(apiUrls.area(), formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    }
);

export const updateAreaRequest = createAsyncThunk("updateAreaRequest", async ({ areaImages, ...data }: AreaUpdateFormValues) => {
    const formData = new FormData();
    const areaOldImages: string[] = [];
    if (areaImages) {
        for (const [index, areaImage] of areaImages.entries()) {
            if (areaImage && typeof areaImage === "object") {
                formData.append(`image_${index}`, areaImage);
            } else {
                areaOldImages.push(areaImage);
            }
        }
    }

    formData.append("area", new Blob([
        JSON.stringify({ ...data, areaImages: areaOldImages })
    ], { type: "application/json" }));

    const { data: responseData } = await axios.put<AreaResponse>(apiUrls.area(), formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return responseData;
});

export const deleteAreaRequest = createAsyncThunk("deleteAreaRequest", async ({ areaId }: { areaId: number; areaName: string }) => {
    const { data } = await axios.delete<BaseResponse>(apiUrls.areaId(areaId));
    return data;
});

export const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAreasRequest.pending, (state) => {
            state.areas = [];
            state.isAreasLoading = true;
            state.isAreasLoadingFailed = false;
        });
        builder.addCase(getAreasRequest.fulfilled, (state, action) => {
            state.areas = action.payload.dataBlock;
            state.isAreasLoading = false;
        });
        builder.addCase(getAreasRequest.rejected, (state) => {
            state.isAreasLoading = false;
            state.isAreasLoadingFailed = true;
        });
        builder.addCase(addAreaRequest.pending, (state, action) => {
            state.isAreaAdding = true;
            toast.loading(`Новая площадка ${action.meta.arg.name} добавляется`, { id: ADD_AREA_TOAST_NAME(action.meta.arg.name) });
        });
        builder.addCase(addAreaRequest.rejected, (state, action) => {
            state.isAreaAdding = false;
            toast.error(`Произошла ошибка при добавлении площадки ${action.meta.arg.name}`, {
                id: ADD_AREA_TOAST_NAME(action.meta.arg.name)
            });
        });
        builder.addCase(addAreaRequest.fulfilled, (state, action) => {
            state.isAreaAdding = false;
            action.meta.arg.addAreaFormRef.current?.resetForm();
            // TODO: Добавить toast
        });
        builder.addCase(deleteAreaRequest.pending, (state, action) => {
            toast.loading(`Информация о площадке ${action.meta.arg.areaName} удаляется`, {
                id: DELETE_AREA_TOAST_ID(action.meta.arg.areaId)
            });
            state.deletingCurrentAreaId = action.meta.arg.areaId;
        });
        builder.addCase(deleteAreaRequest.rejected, (state, action) => {
            state.deletingCurrentAreaId = undefined;
            toast.error(`При удалении информации о площадке ${action.meta.arg.areaName} произошла ошибка. Повторите удаление позже`, {
                id: DELETE_AREA_TOAST_ID(action.meta.arg.areaId)
            });
        });
        builder.addCase(deleteAreaRequest.fulfilled, (state, action) => {
            state.areas = state.areas.filter((area) => area.id !== action.meta.arg.areaId);
            state.deletingCurrentAreaId = undefined;
            toast.success(`Информация о площадке ${action.meta.arg.areaName} удалена успешно`, {
                id: DELETE_AREA_TOAST_ID(action.meta.arg.areaId)
            });
        });
        builder.addCase(getAreaRequest.pending, (state) => {
            state.isCurrentAreaLoading = true;
            state.isCurrentAreaLoadingFailed = false;
            state.currentArea = undefined;
        });
        builder.addCase(getAreaRequest.rejected, (state) => {
            // TODO: нужен отдельный код ошибки, если площадка с переданным id не найдена
            state.isCurrentAreaLoading = false;
            state.isCurrentAreaLoadingFailed = true;
        });
        builder.addCase(getAreaRequest.fulfilled, (state, action) => {
            state.isCurrentAreaLoading = false;
            state.currentArea = action.payload.dataBlock;
        });
        builder.addCase(updateAreaRequest.pending, (state, action) => {
            toast.loading(`Информация о площадке ${action.meta.arg.name} обновляется`, {
                id: UPDATE_AREA_TOAST_ID(action.meta.arg.id)
            });
            state.isUpdatingCurrentArea = true;
        });
        builder.addCase(updateAreaRequest.rejected, (state, action) => {
            state.isUpdatingCurrentArea = false;
            toast.error(`При обновлении информации о площадке ${action.meta.arg.name} произошла ошибка. Повторите обновление позже`, {
                id: UPDATE_AREA_TOAST_ID(action.meta.arg.id)
            });
        });
        builder.addCase(updateAreaRequest.fulfilled, (state, action) => {
            state.isUpdatingCurrentArea = false;
            state.currentArea = action.payload.dataBlock;
            toast.success(`Информация о площадке ${action.meta.arg.name} обновлена успешно`, {
                id: UPDATE_AREA_TOAST_ID(action.meta.arg.id)
            });
        });
    }
});

export default areaSlice.reducer;
