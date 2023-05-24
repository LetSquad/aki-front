import { BasePageResponse } from "@models/http/types";
import {
    PlaceConfirmationStatus,
    PlacesFiltersFieldsName,
    PriceType,
    Specialization
} from "@models/places/enums";
import { LandlordInfo } from "@models/users/types";

export interface Place {
    id: number;
    name: string;
    address: string;
    email: string;
    site: string;
    specialization: Specialization[];
    rating?: PlaceRating;
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

export interface PlaceRating {
    rate: number;
    rateCount: number;
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

export type PlaceResponse = Place;

export interface PlacesResponse extends BasePageResponse {
    places: Place[];
}

export type PlaceUpdateFormValues = Omit<Place, "user" | "status" | "rating">;
export type PlaceAddFormValues = Omit<PlaceUpdateFormValues, "id">;

export interface PlaceDetailsFormRef {
    resetForm: () => void;
}

export interface PlacesFiltersFormValues {
    [PlacesFiltersFieldsName.SPECIALIZATION]?: Specialization[];
    [PlacesFiltersFieldsName.RATING]?: number,
    [PlacesFiltersFieldsName.PRICE_MIN]?: number;
    [PlacesFiltersFieldsName.PRICE_MAX]?: number;
    [PlacesFiltersFieldsName.CAPACITY_MIN]?: number;
    [PlacesFiltersFieldsName.CAPACITY_MAX]?: number;
    [PlacesFiltersFieldsName.SQUARE_MIN]?: number;
    [PlacesFiltersFieldsName.SQUARE_MAX]?: number;
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MIN]?: number;
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MAX]?: number;
    [PlacesFiltersFieldsName.WITH_PARKING]: boolean;
    [PlacesFiltersFieldsName.DATE_FROM]?: string;
    [PlacesFiltersFieldsName.DATE_TO]?: string;
}
