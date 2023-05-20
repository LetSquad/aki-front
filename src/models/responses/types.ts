import { UserRole } from "@models/users/enums";
import { User } from "@models/users/types";

export interface BaseResponse {
    meta: {
        code: number;
        description: string;
    };
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

export type UserResponse = {
    dataBlock: User;
} & BaseResponse;
