import { createSelector } from "@reduxjs/toolkit";

import { containsStringOrNumberInNumberArray } from "@coreUtils/utils";
import { RootState } from "@store/index";

export const selectCancelRentSlotIds = (state: RootState) => state.rentSlot.cancelRentSlotIds;

const selectRentSlotId = (_state: RootState, rentSlotId?: string | number) => rentSlotId;

export const selectIsAppointmentSlotCancelling = createSelector(
    [selectCancelRentSlotIds, selectRentSlotId],
    containsStringOrNumberInNumberArray
);

export const selectIsNewRentSlotsAdding = (state: RootState) => state.rentSlot.isNewRentSlotsAdding;
