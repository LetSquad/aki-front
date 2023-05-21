import {
    BaseRegistrationFieldName,
    LandlordRegistrationFieldName,
    ResetPasswordFieldName,
    SignInFieldName
} from "@models/auth/enums";
import { BaseResponse } from "@models/responses/types";
import { BaseUserRole, UserRole } from "@models/users/enums";
import { User } from "@models/users/types";

export interface ResetPasswordFormValues {
    [ResetPasswordFieldName.EMAIL]: string;
}

export interface SignInFormValues {
    [SignInFieldName.EMAIL]: string;
    [SignInFieldName.PASSWORD]: string;
}

export interface SignUpFormValues {
    [BaseRegistrationFieldName.ROLE]: BaseUserRole;
    [BaseRegistrationFieldName.FIRST_NAME]: string;
    [BaseRegistrationFieldName.LAST_NAME]: string;
    [BaseRegistrationFieldName.MIDDLE_NAME]?: string;
    [BaseRegistrationFieldName.EMAIL]: string;
    [BaseRegistrationFieldName.PHONE]: string;
    [BaseRegistrationFieldName.PASSWORD]: string;
    [BaseRegistrationFieldName.PASSWORD_CONFIRM]: string;
    [LandlordRegistrationFieldName.INN]?: string;
    [LandlordRegistrationFieldName.JOB_TITLE]?: string;
}

interface RolesResponse {
    role: UserRole;
}

export type SignInResponse = {
    dataBlock: RolesResponse;
} & BaseResponse;

export type SignUpResponse = {
    dataBlock: User;
} & BaseResponse;
