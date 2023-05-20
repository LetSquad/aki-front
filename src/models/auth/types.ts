import {
    BaseRegistrationFieldName,
    LandlordRegistrationFieldName,
    ResetPasswordFieldName,
    SignInFieldName
} from "@models/auth/enums";
import { BaseUserRole } from "@models/users/enums";

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
    [BaseRegistrationFieldName.SURNAME]?: string;
    [BaseRegistrationFieldName.EMAIL]: string;
    [BaseRegistrationFieldName.PHONE]: string;
    [BaseRegistrationFieldName.PASSWORD]: string;
    [BaseRegistrationFieldName.PASSWORD_CONFIRM]: string;
    [LandlordRegistrationFieldName.INN]?: string;
    [LandlordRegistrationFieldName.JOB_TITLE]?: string;
}
