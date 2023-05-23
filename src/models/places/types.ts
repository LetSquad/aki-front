import { PlaceConfirmationStatus, PriceType, Specialization } from "@models/places/enums";
import { BaseResponse } from "@models/responses/types";
import { LandlordInfo } from "@models/users/types";

export interface Place {
    id: number;
    name: string;
    address: string;
    email: string;
    site: string;
    specialization: Specialization;
    placeImages?: (string | File)[];
    phone: string;
    description: string;
    price: PlacePrice;
    status: PlaceConfirmationStatus;
    fullSquare?: number;
    freeSquare?: number;
    maxCapacity?: number;
    minCapacity?: number;
    levelNumber?: number;
    parking?: boolean;
    services?: PlaceService[];
    equipments?: PlaceEquipment[];
    facilities?: PlaceFacilities[];
    user: LandlordInfo
}

export interface PlacePrice {
    price: number;
    priceType: PriceType;
}

export interface PlaceService {
    name: string;
    price: PlacePrice;
}

export interface PlaceEquipment {
    name: string;
    price: PlacePrice;
    count?: number;
}

export interface PlaceFacilities {
    name: string;
    count?: number;
}

export type PlaceResponse = {
    dataBlock: Place;
} & BaseResponse;

export type PlacesResponse = {
    dataBlock: Place[];
} & BaseResponse;

export type PlaceUpdateFormValues = Omit<Place, "user" | "status">;
export type PlaceAddFormValues = Omit<PlaceUpdateFormValues, "id">;

export interface PlaceDetailsFormRef {
    resetForm: () => void;
}
