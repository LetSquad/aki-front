import { UserRole } from "@models/users/enums";

interface BaseUserInfo {
    userRole: UserRole;
    userId: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    surname?: string;
    userImage?: string;
}

export interface RenterInfo extends BaseUserInfo {
    userRole: UserRole.RENTER;
}

export interface LandlordInfo extends BaseUserInfo {
    userRole: UserRole.LANDLORD;
    inn: string;
    entityName: string;
    jobTitle: string;
}

export interface AdminInfo extends BaseUserInfo {
    userRole: UserRole.ADMIN;
}

export type User = RenterInfo | LandlordInfo | AdminInfo;

type RenterFormFields = Omit<BaseUserInfo, "userId" | "userRole">;
type LandlordFormFields = Omit<LandlordInfo, "userId" | "userRole">;
type AdminFormFields = Omit<AdminInfo, "userId" | "userRole">;

export type UserFormFields = RenterFormFields | LandlordFormFields | AdminFormFields;
