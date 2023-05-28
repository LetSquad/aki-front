import { UserRole, UserSpecialization } from "@models/users/enums";

interface BaseUserInfo {
    userRole: UserRole;
    id: number;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    userImage?: string | null;
}

export interface RenterInfo extends BaseUserInfo {
    userRole: UserRole.RENTER;
    specializations: UserSpecialization[];
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

export type UserResponse = User;
