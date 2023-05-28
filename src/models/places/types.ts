import { BasePageResponse } from "@models/http/types";
import {
    PlacesFiltersFieldsName,
    PlaceSpecialization,
    PlacesSortDirection,
    PlacesSortType,
    PlaceStatus,
    PriceType
} from "@models/places/enums";
import { RentSlot } from "@models/rentSlots/types";
import { LandlordInfo } from "@models/users/types";

export interface Place {
    id: number;
    name: string;
    address: string;
    email: string;
    site: string;
    specialization: PlaceSpecialization[];
    rating?: PlaceRating | null;
    placeImages?: (string | File)[] | null;
    phone: string;
    description: string;
    price: PlacePrice;
    status: PlaceStatus;
    banReason?: string | null;
    fullSquare?: number | null;
    freeSquare?: number | null;
    maxCapacity?: number | null;
    minCapacity?: number | null;
    levelNumber?: number | null;
    parking?: boolean | null;
    services?: PlaceService[] | null;
    equipments?: PlaceEquipment[] | null;
    facilities?: PlaceFacilities[] | null;
    rentSlots?: RentSlot[] | null;
    user: LandlordInfo;
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
    count?: number | null;
}

export interface PlaceFacilities {
    name: string;
    count?: number | null;
}

export type PlaceResponse = Place;

export interface PlacesResponse extends BasePageResponse {
    places: Place[];
}

export type PlaceUpdateFormValues = Omit<Place, "user" | "status" | "rating" | "price">;
export type PlaceAddFormValues = Omit<PlaceUpdateFormValues, "id">;

export interface PlaceDetailsFormRef {
    resetForm: () => void;
}

export interface PlacesFiltersFormValues {
    [PlacesFiltersFieldsName.SPECIALIZATION]?: PlaceSpecialization[];
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

export interface PlacesSortRequest {
    sortType: PlacesSortType;
    sortDirection: PlacesSortDirection;
}
