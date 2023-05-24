import { BaseResponse } from "@models/http/types";
import { UserRole } from "@models/users/enums";

interface BaseUserInfo {
    userRole: UserRole;
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    userImage?: string;
}

export interface RenterInfo extends BaseUserInfo {
    userRole: UserRole.RENTER;
}

export interface LandlordInfo extends BaseUserInfo {
    userRole: UserRole.LANDLORD;
    inn: string;
    organization: string;
    jobTitle: string;
}

export interface AdminInfo extends BaseUserInfo {
    userRole: UserRole.ADMIN;
}

export type User = RenterInfo | LandlordInfo | AdminInfo;

type RenterFormFields = Omit<BaseUserInfo, "id" | "userRole">;
type LandlordFormFields = Omit<LandlordInfo, "id" | "userRole">;
type AdminFormFields = Omit<AdminInfo, "id" | "userRole">;

export type UserFormFields = RenterFormFields | LandlordFormFields | AdminFormFields;

export type UserResponse = {
    dataBlock: User;
} & BaseResponse;
