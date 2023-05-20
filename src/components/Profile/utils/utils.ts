import { BaseUserRole } from "@models/users/enums";

export function userRoleToLabel(userRole: BaseUserRole): string {
    switch (userRole) {
        case BaseUserRole.RENTER: {
            return "Арендатор";
        }
        case BaseUserRole.LANDLORD: {
            return "Арендодатель";
        }
        // skip default
    }
}
