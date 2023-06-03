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
    isBanned?: boolean;
    organizationLogo?: string | null;
}

export interface RenterInfo extends BaseUserInfo {
    userRole: UserRole.RENTER;
    organizationLogo?: null;
    specializations: UserSpecialization[];
}

export interface LandlordInfo extends BaseUserInfo {
    userRole: UserRole.LANDLORD;
    inn: string;
    organizationLogo?: string | null;
    organization: string;
    jobTitle: string;
}

export interface AdminInfo extends BaseUserInfo {
    userRole: UserRole.ADMIN;
    organizationLogo?: null;
}

export type User = RenterInfo | LandlordInfo | AdminInfo;

type RenterFormFields = Omit<BaseUserInfo, "id" | "userRole" | "isBanned">;
type LandlordFormFields = Omit<LandlordInfo, "id" | "userRole" | "isBanned">;
type AdminFormFields = Omit<AdminInfo, "id" | "userRole" | "isBanned">;

export type UserFormFields = RenterFormFields | LandlordFormFields | AdminFormFields;

export type UserResponse = User;
