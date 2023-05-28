export enum BasePageSlugs {
    DASHBOARD = "/",
    MY_PROFILE = "/profile",
    USER = "/users/:userId",
    PLACE = "/places/:placeId"
}

export enum LandLordPageSlugs {
    NEW_PLACE = "/places/create",
    MY_PLACES = "/profile/places",
    PLACE_SCHEDULE = "/places/:placeId/schedule"
}

export enum RenterPageSlugs {
    MY_RENTS = "/rents"
}
