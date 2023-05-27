import statusStyles from "@coreStyles/parts.module.scss";
import { RentStatus } from "@models/rent/enums";

export function getRentStatusTitleFromEnum(rentConfirmationStatus: RentStatus): string {
    switch (rentConfirmationStatus) {
        case RentStatus.OPEN: {
            return "Открыта";
        }
        case RentStatus.CLOSED: {
            return "Закрыта";
        }
        case RentStatus.CANCELED: {
            return "Отменена";
        }
        // skip default
    }
}

export function getRentStatusColorFromEnum(rentStatusType: RentStatus): string {
    switch (rentStatusType) {
        case RentStatus.OPEN: {
            return statusStyles.statusInProgress;
        }
        case RentStatus.CLOSED: {
            return statusStyles.statusSuccess;
        }
        case RentStatus.CANCELED: {
            return statusStyles.statusError;
        }
        // skip default
    }
}
