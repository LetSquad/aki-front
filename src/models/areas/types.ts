import { AreaConfirmationStatus, PriceType, Specialization } from "@models/areas/enums";
import { BaseResponse } from "@models/responses/types";
import { LandlordInfo } from "@models/users/types";

export interface Area {
    id: number;
    name: string;
    address: string;
    email: string;
    site: string;
    specialization: Specialization;
    areaImages?: (string | File)[];
    phone: string;
    description: string;
    price: AreaPrice;
    status: AreaConfirmationStatus;
    fullSquare?: number;
    freeSquare?: number;
    maxCapacity?: number;
    minCapacity?: number;
    numberOfStoreys?: number;
    parking?: boolean;
    services?: AreaService[];
    equipments?: AreaEquipment[];
    facilities?: AreaFacilities[];
    user: LandlordInfo
}

export interface AreaPrice {
    price: number;
    priceType: PriceType;
}

export interface AreaService {
    name: string;
    price: AreaPrice;
}

export interface AreaEquipment {
    name: string;
    price: AreaPrice;
    count?: number;
}

export interface AreaFacilities {
    name: string;
    count?: number;
}

export type AreaResponse = {
    dataBlock: Area;
} & BaseResponse;

export type AreasResponse = {
    dataBlock: Area[];
} & BaseResponse;

export type AreaAddFormValues = Omit<Area, "id" | "user">;
export type AreaUpdateFormValues = Omit<Area, "user">;

export interface AreaDetailFormRef {
    resetForm: () => void;
}
