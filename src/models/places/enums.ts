export enum PlaceConfirmationStatus {
    CONFIRMED = "CONFIRMED",
    PENDING = "PENDING",
    REJECTED = "REJECTED"
}

export enum PriceType {
    HOUR = "HOUR",
    DAY = "DAY",
    RENT = "RENT",
    FREE = "FREE"
}

export enum Specialization {
    FILM_STUDIO = "FILM_STUDIO",
    GALLERY = "GALLERY",
    PUBLISHING_HOUSE = "PUBLISHING_HOUSE",
    BOOKSTORE = "BOOKSTORE",
    DESIGN_STUDIO = "DESIGN_STUDIO",
    CREATIVE_SPACE = "CREATIVE_SPACE",
    CINEMA = "CINEMA",
    SOUND_RECORDING_STUDIO = "SOUND_RECORDING_STUDIO",
    AR_VR_STUDIOS = "AR_VR_STUDIOS"
}

export enum PlaceFieldsName {
    NAME = "name",
    DESCRIPTION = "description",
    ADDRESS = "address",
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
    PRICE = "price",
    SERVICES = "services",
    EQUIPMENTS = "equipments",
    FACILITIES = "facilities",
    PLACE_IMAGES = "placeImages"
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
