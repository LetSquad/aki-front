import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DateTime, Interval } from "luxon";
import { toast } from "react-hot-toast";

import apiUrls from "@api/apiUrls";
import { PlaceResponse } from "@models/places/types";
import { NewRentSlotsDatePeriodsFieldName, RentSlotDuration } from "@models/rentSlots/enums";
import { NewRentSlotFormValues, RentSlotRequest } from "@models/rentSlots/types";

const CANCEL_RENT_SLOT_TOAST = (rentSlotId: number) => `cancel-rent-slot-${rentSlotId}`;
const ADD_RENT_SLOTS_TOAST = (placeId: number) => `add-rent-slots-${placeId}`;

interface RentSlotState {
    isNewRentSlotsAdding: boolean;
    cancelRentSlotIds: number[];
}

const initialState: RentSlotState = {
    isNewRentSlotsAdding: false,
    cancelRentSlotIds: []
};

export const createRentSlotsRequest = createAsyncThunk("createRentSlotsRequest", async ({
    timeStart,
    timeEnd,
    aroundTheClock,
    duration,
    price,
    datePeriods,
    placeId
}: NewRentSlotFormValues & {
    placeId: number;
    placeName: string;
}) => {
    let rentSlots: RentSlotRequest[] = [];

    for (const datePeriod of datePeriods) {
        const datePeriodStart = DateTime.fromISO(datePeriod[NewRentSlotsDatePeriodsFieldName.DATE_START]);
        const datePeriodEnd = DateTime.fromISO(datePeriod[NewRentSlotsDatePeriodsFieldName.DATE_END]);
        let dayDate = DateTime.fromObject({
            year: datePeriodStart.year,
            month: datePeriodStart.month,
            day: datePeriodStart.day
        });
        const endDayDate = DateTime.fromObject({
            year: datePeriodEnd.year,
            month: datePeriodEnd.month,
            day: datePeriodEnd.day
        });
        do {
            if (duration === RentSlotDuration.DAY) {
                const dateSlot = {
                    timeStart: `${dayDate.toISODate()}T${timeStart}`,
                    timeEnd: `${dayDate.toISODate()}T${timeEnd}`,
                    price,
                    placeId
                };
                rentSlots = [...rentSlots, dateSlot];
            } else {
                const start = DateTime.fromISO(`${dayDate.toISODate()}T${aroundTheClock ? "00:00:00.000+03.00" : timeStart}`);
                const end = DateTime.fromISO(`${dayDate.toISODate()}T${aroundTheClock ? "24:00:00.000+03.00" : timeEnd}`);

                const dateSlots = Interval
                    .fromDateTimes(start, end)
                    .splitBy({ hour: 1 })
                    .map((d) => ({
                        timeStart: d.start?.toISO() as string,
                        timeEnd: d.end?.toISO() as string,
                        price,
                        placeId
                    }));

                rentSlots = [...rentSlots, ...dateSlots];
            }

            dayDate = dayDate.plus({ day: 1 });
        } while (dayDate <= endDayDate);
    }

    const { data } = await axios.post<PlaceResponse>(
        apiUrls.rentSlots(),
        { rentSlots }
    );

    return data;
});

export const cancelRentSlotsRequest = createAsyncThunk(
    "cancelRentSlotsRequest",
    async ({ rentSlotIds }: { rentSlotIds: number[], placeName: string }) => {
        const { data } = await axios.delete<PlaceResponse>(
            apiUrls.rentSlots(),
            { data: { rentSlotIds } }
        );
        return data;
    }
);

export const rentSlotSlice = createSlice({
    name: "rentSlot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cancelRentSlotsRequest.pending, (state, action) => {
            toast.loading(
                `Отменяем слоты аренды для площадки "${action.meta.arg.placeName}"`,
                { id: CANCEL_RENT_SLOT_TOAST(action.meta.arg.rentSlotIds[0]) }
            );
            state.cancelRentSlotIds = action.meta.arg.rentSlotIds;
        });
        builder.addCase(cancelRentSlotsRequest.rejected, (state, action) => {
            toast.error(
                `При отмене слотов аренды для площадки "${action.meta.arg.placeName}" произошла ошибка. Повторите отмену позже`,
                { id: CANCEL_RENT_SLOT_TOAST(action.meta.arg.rentSlotIds[0]) }
            );
            state.cancelRentSlotIds = [];
        });
        builder.addCase(cancelRentSlotsRequest.fulfilled, (state, action) => {
            toast.success(
                `Слоты аренды площадки "${action.meta.arg.placeName}" отменены`,
                { id: CANCEL_RENT_SLOT_TOAST(action.meta.arg.rentSlotIds[0]) }
            );
            state.cancelRentSlotIds = [];
        });
        builder.addCase(createRentSlotsRequest.pending, (state, action) => {
            toast.loading(
                `Создаем слоты аренды для площадки "${action.meta.arg.placeName}"`,
                { id: ADD_RENT_SLOTS_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentSlotsAdding = true;
        });
        builder.addCase(createRentSlotsRequest.rejected, (state, action) => {
            toast.error(
                `При создании слотов аренды для площадки "${action.meta.arg.placeName}" произошла ошибка. Повторите создание позже`,
                { id: ADD_RENT_SLOTS_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentSlotsAdding = false;
        });
        builder.addCase(createRentSlotsRequest.fulfilled, (state, action) => {
            toast.success(
                `Слоты аренды для площадки "${action.meta.arg.placeName}" созданы`,
                { id: ADD_RENT_SLOTS_TOAST(action.meta.arg.placeId) }
            );
            state.isNewRentSlotsAdding = false;
        });
    }
});

export default rentSlotSlice.reducer;
