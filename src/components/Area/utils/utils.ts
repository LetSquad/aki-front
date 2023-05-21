import { AreaConfirmationStatus, PriceType, Specialization } from "@models/areas/enums";

export function getSpecializationTitleFromEnum(specialization: Specialization): string {
    switch (specialization) {
        case Specialization.AR_VR_STUDIOS: {
            return "AR/VR студия";
        }
        case Specialization.BOOKSTORE: {
            return "Книжный магазин";
        }
        case Specialization.CINEMA: {
            return "Кинотеатр";
        }
        case Specialization.CREATIVE_SPACE: {
            return "Креативное пространство";
        }
        case Specialization.DESIGN_STUDIO: {
            return "Дизайн студия";
        }
        case Specialization.FILM_STUDIO: {
            return "Киностудия";
        }
        case Specialization.GALLERY: {
            return "Галерея";
        }
        case Specialization.PUBLISHING_HOUSE: {
            return "Издательство";
        }
        case Specialization.SOUND_RECORDING_STUDIO: {
            return "Звукозаписывающая студия";
        }
        // skip default
    }
}

export function getAreaConfirmationStatusTitleFromEnum(areaConfirmationStatus: AreaConfirmationStatus): string {
    switch (areaConfirmationStatus) {
        case AreaConfirmationStatus.CONFIRMED: {
            return "Опубликована";
        }
        case AreaConfirmationStatus.PENDING: {
            return "На рассмотрении";
        }
        case AreaConfirmationStatus.REJECTED: {
            return "Отклонена";
        }
        // skip default
    }
}

export function getPriceTypeTitleFromEnum(priceType: PriceType): string {
    switch (priceType) {
        case PriceType.DAY: {
            return "/день";
        }
        case PriceType.HOUR: {
            return "/час";
        }
        case PriceType.RENT: {
            return "/аренду";
        }
        case PriceType.FREE: {
            return "Бесплатно";
        }
        // skip default
    }
}

export function getCapacityTitleFromNumbers(minCapacity?: number, maxCapacity?: number): string {
    const minCapacityTitle = minCapacity ? `от ${minCapacity}` : undefined;
    const maxCapacityTitle = maxCapacity ? `до ${maxCapacity}` : undefined;

    return `${minCapacityTitle} ${maxCapacityTitle} человек`;
}
