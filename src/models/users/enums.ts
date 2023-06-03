export enum BaseUserRole {
    RENTER = "RENTER",
    LANDLORD = "LANDLORD"
}

export enum UserRole {
    ADMIN = "ADMIN",
    RENTER = "RENTER",
    LANDLORD = "LANDLORD"
}

export enum BaseUserFieldsName {
    FIRST_NAME = "firstName",
    MIDDLE_NAME = "middleName",
    LAST_NAME = "lastName",
    IMAGE = "userImage",
    EMAIL = "email",
    PHONE = "phone"
}

export enum LandlordBaseUserFieldsName {
    INN = "inn",
    ORGANIZATION_LOGO = "organizationLogo",
    ORGANIZATION = "organization",
    JOB_TITLE = "jobTitle"
}

export enum RenterBaseUserFieldsName {
    SPECIALIZATIONS = "specializations"
}

export enum UserSpecialization {
    ART = "ART",
    ARCHITECTURE = "ARCHITECTURE",
    VIDEO_GAMES_AND_SOFTWARE = "VIDEO_GAMES_AND_SOFTWARE",
    DESIGN = "DESIGN",
    PUBLISHING_AND_NEW_MEDIA = "PUBLISHING_AND_NEW_MEDIA",
    PERFORMING_ARTS = "PERFORMING_ARTS",
    FILM_AND_ANIMATION = "FILM_AND_ANIMATION",
    FASHION = "FASHION",
    MUSIC = "MUSIC",
    ADVERTISING = "ADVERTISING"
}
