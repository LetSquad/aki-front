import statusStyles from "@coreStyles/parts.module.scss";
import { RentStatus } from "@models/rent/enums";

export function getRentStatusTitleFromEnum(rentConfirmationStatus: RentStatus): string {
    switch (rentConfirmationStatus) {
        case RentStatus.OPEN: {
            return "Открыто";
        }
        case RentStatus.CLOSED: {
            return "Закрыто";
        }
        case RentStatus.CANCELED: {
            return "Отменено";
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
