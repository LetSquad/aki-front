import { PlaceSpecialization, PlaceStatus } from "@models/places/enums";

export function getPlaceSpecializationTitleFromEnum(specialization: PlaceSpecialization): string {
    switch (specialization) {
        case PlaceSpecialization.AR_VR_STUDIOS: {
            return "AR/VR студия";
        }
        case PlaceSpecialization.BOOKSTORE: {
            return "Книжный магазин";
        }
        case PlaceSpecialization.CINEMA: {
            return "Кинотеатр";
        }
        case PlaceSpecialization.CREATIVE_SPACE: {
            return "Креативное пространство";
        }
        case PlaceSpecialization.DESIGN_STUDIO: {
            return "Дизайн студия";
        }
        case PlaceSpecialization.FILM_STUDIO: {
            return "Киностудия";
        }
        case PlaceSpecialization.GALLERY: {
            return "Галерея";
        }
        case PlaceSpecialization.PUBLISHING_HOUSE: {
            return "Издательство";
        }
        case PlaceSpecialization.SOUND_RECORDING_STUDIO: {
            return "Звукозаписывающая студия";
        }
        case PlaceSpecialization.SHOWROOM: {
            return "Выставочный зал";
        }
        case PlaceSpecialization.ART_WORKSHOP: {
            return "Художественная мастерская";
        }
        case PlaceSpecialization.PROTOTYPING_CENTER: {
            return "Центр прототипирования";
        }
        case PlaceSpecialization.LAYOUT_WORKSHOP: {
            return "Мастерская макетирования";
        }
        case PlaceSpecialization.RENDERING_STUDIO: {
            return "Рендеринг студия";
        }
        case PlaceSpecialization.PHOTO_VIDEO_STUDIO: {
            return "Фото-видеостудия";
        }
        case PlaceSpecialization.REHEARSAL_ROOM: {
            return "Репетиционный зал";
        }
        case PlaceSpecialization.DANCE_HALL: {
            return "Танцевальный зал";
        }
        case PlaceSpecialization.STAGE_SPACE: {
            return "Сценическое пространство";
        }
        case PlaceSpecialization.VIDEO_EDITING_STUDIO: {
            return "Студия видеомонтажа (кинопроизводства)";
        }
        case PlaceSpecialization.MOKAP_STUDIO: {
            return "МОКАП студия";
        }
        case PlaceSpecialization.SEWING_SHOP: {
            return "Пошивочный цех";
        }
        case PlaceSpecialization.SHOW_SPACE: {
            return "Пространство для показа";
        }
        case PlaceSpecialization.MUSIC_REHEARSAL_STUDIO: {
            return "Музыкальная репетиционная студия";
        }
        case PlaceSpecialization.CONCERT_HALL: {
            return "Концертная площадка";
        }
        // skip default
    }
}

export function getPlaceStatusTitleFromEnum(placeConfirmationStatus: PlaceStatus): string {
    switch (placeConfirmationStatus) {
        case PlaceStatus.VERIFIED: {
            return "Опубликована";
        }
        case PlaceStatus.UNVERIFIED: {
            return "На рассмотрении";
        }
        case PlaceStatus.BANNED: {
            return "Забанена";
        }
        // skip default
    }
}
