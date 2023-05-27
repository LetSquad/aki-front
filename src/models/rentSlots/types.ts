import {
    NewRentSlotsDatePeriodsFieldName,
    NewRentSlotsFieldName,
    RentSlotDuration,
    RentSlotStatus
} from "./enums";

export interface RentSlot {
    id: number;
    status: RentSlotStatus;
    price: number;
    timeStart: string;
    timeEnd: string;
    placeId: number
}

export type RentSlotRequest = Omit<RentSlot, "id" | "status">;

export interface RentSlotDatePeriod {
    [NewRentSlotsDatePeriodsFieldName.DATE_START]: string;
    [NewRentSlotsDatePeriodsFieldName.DATE_END]: string;
}

export interface NewRentSlotFormValues {
    [NewRentSlotsFieldName.TIME_START]: string;
    [NewRentSlotsFieldName.TIME_END]: string;
    [NewRentSlotsFieldName.AROUND_THE_CLOCK]: boolean;
    [NewRentSlotsFieldName.DURATION]: RentSlotDuration;
    [NewRentSlotsFieldName.PRICE]: number;
    [NewRentSlotsFieldName.DATE_PERIOD]: RentSlotDatePeriod[];
}

export type OptionalNewRentSlotFormValues = Partial<NewRentSlotFormValues>;
