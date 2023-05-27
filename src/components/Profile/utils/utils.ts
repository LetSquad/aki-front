import { BaseUserRole, UserSpecialization } from "@models/users/enums";

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

export function getUserSpecializationTitleFromEnum(specialization: UserSpecialization): string {
    switch (specialization) {
        case UserSpecialization.ART: {
            return "Арт";
        }
        case UserSpecialization.ARCHITECTURE: {
            return "Архитектура";
        }
        case UserSpecialization.VIDEO_GAMES_AND_SOFTWARE: {
            return "Видеоигры и ПО";
        }
        case UserSpecialization.DESIGN: {
            return "Дизайн";
        }
        case UserSpecialization.PUBLISHING_AND_NEW_MEDIA: {
            return "Издательское дело и новые медиа";
        }
        case UserSpecialization.PERFORMING_ARTS: {
            return "Исполнительские искусства";
        }
        case UserSpecialization.FILM_AND_ANIMATION: {
            return "Кино и анимация";
        }
        case UserSpecialization.FASHION: {
            return "Мода";
        }
        case UserSpecialization.MUSIC: {
            return "Музыка";
        }
        case UserSpecialization.ADVERTISING: {
            return "Реклама";
        }
        // skip default
    }
}
