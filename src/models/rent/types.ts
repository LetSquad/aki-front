import { BasePageResponse } from "@models/http/types";
import { Place } from "@models/places/types";
import { NewRentFieldName, RentStatus } from "@models/rent/enums";
import { RentSlot } from "@models/rentSlots/types";
import { RenterInfo } from "@models/users/types";

export interface Rent {
    id: number;
    place: Place;
    renter: RenterInfo;
    rentSlots: RentSlot[];
    rating?: number | null;
    status: RentStatus;
    banReason?: string | null;
}

export interface NewRentRequest {
    placeId: number;
    rentSlotIds: number[];
}

export interface RentsResponse extends BasePageResponse {
    rents : Rent[];
}
export type RentResponse = Rent;

export interface NewRentByHoursFormValues {
    [NewRentFieldName.TIME_START]?: string;
    [NewRentFieldName.TIME_END]?: string;
    [NewRentFieldName.DATE]?: string;
}

export interface NewRentByDaysFormValues {
    [NewRentFieldName.DATE_TIME_START]?: string;
    [NewRentFieldName.DATE_TIME_END]?: string;
}
