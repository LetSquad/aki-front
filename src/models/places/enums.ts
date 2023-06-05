export enum PlaceStatus {
    VERIFIED = "VERIFIED",
    UNVERIFIED = "UNVERIFIED",
    BANNED = "BANNED"
}

export enum PriceType {
    HOUR = "HOUR",
    DAY = "DAY",
    RENT = "RENT",
    FREE = "FREE"
}

export enum PlaceSpecialization {
    FILM_STUDIO = "FILM_STUDIO",
    GALLERY = "GALLERY",
    PUBLISHING_HOUSE = "PUBLISHING_HOUSE",
    BOOKSTORE = "BOOKSTORE",
    DESIGN_STUDIO = "DESIGN_STUDIO",
    CREATIVE_SPACE = "CREATIVE_SPACE",
    CINEMA = "CINEMA",
    SOUND_RECORDING_STUDIO = "SOUND_RECORDING_STUDIO",
    AR_VR_STUDIOS = "AR_VR_STUDIOS",
    SHOWROOM = "SHOWROOM",
    ART_WORKSHOP = "ART_WORKSHOP",
    PROTOTYPING_CENTER = "PROTOTYPING_CENTER",
    LAYOUT_WORKSHOP = "LAYOUT_WORKSHOP",
    RENDERING_STUDIO = "RENDERING_STUDIO",
    PHOTO_VIDEO_STUDIO = "PHOTO_VIDEO_STUDIO",
    REHEARSAL_ROOM = "REHEARSAL_ROOM",
    DANCE_HALL = "DANCE_HALL",
    STAGE_SPACE = "STAGE_SPACE",
    VIDEO_EDITING_STUDIO = "VIDEO_EDITING_STUDIO",
    MOKAP_STUDIO = "MOKAP_STUDIO",
    SEWING_SHOP = "SEWING_SHOP",
    SHOW_SPACE = "SHOW_SPACE",
    MUSIC_REHEARSAL_STUDIO = "MUSIC_REHEARSAL_STUDIO",
    CONCERT_HALL = "CONCERT_HALL"
}

export enum PlaceFieldsName {
    NAME = "name",
    DESCRIPTION = "description",
    ADDRESS = "address",
    METRO_STATIONS = "metroStations",
    EMAIL = "email",
    SITE = "site",
    SPECIALIZATION = "specialization",
    PHONE = "phone",
    FULL_SQUARE = "fullSquare",
    FREE_SQUARE = "freeSquare",
    MAX_CAPACITY = "maxCapacity",
    MIN_CAPACITY = "minCapacity",
    LEVEL_NUMBER = "levelNumber",
    PARKING = "parking",
    COORDINATES = "coordinates",
    SERVICES = "services",
    EQUIPMENTS = "equipments",
    FACILITIES = "facilities",
    PLACE_IMAGES = "placeImages"
}

export enum PlaceCoordinatesFieldsName {
    LATITUDE = "latitude",
    LONGITUDE = "longitude"
}

export enum PlacePriceFieldsName {
    PRICE = "price",
    PRICE_TYPE = "priceType"
}

export enum PlaceFacilityFieldsName {
    NAME = "name",
    COUNT = "count"
}

export enum PlaceServiceFieldsName {
    NAME = "name",
    PRICE = "price"
}

export enum PlaceEquipmentFieldsName {
    NAME = "name",
    PRICE = "price",
    COUNT = "count"
}

export enum PlacesFiltersFieldsName {
    SPECIALIZATION = "specialization",
    RATING = "rating",
    PRICE_MIN = "priceMin",
    PRICE_MAX = "priceMax",
    CAPACITY_MIN = "capacityMin",
    CAPACITY_MAX = "capacityMax",
    SQUARE_MIN = "squareMin",
    SQUARE_MAX = "squareMax",
    LEVEL_NUMBER_MIN = "levelNumberMin",
    LEVEL_NUMBER_MAX = "levelNumberMax",
    WITH_PARKING = "withParking",
    DATE_FROM = "dateFrom",
    DATE_TO = "dateTo",
    METRO_STATIONS = "metroStations"
}

export enum PlacesSortType {
    POPULAR = "popular",
    RATING = "rating",
    PRICE = "price",
    PERSONAL = "personal"
}

export enum PlacesSortDirection {
    ASC = "ASC",
    DESC = "DESC"
}
