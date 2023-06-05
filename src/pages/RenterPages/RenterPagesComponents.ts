import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const UserRents = lazy(/* webpackChunkName: "UserRents" */ () => import("@components/Rent/UserRents"));
const UserPlaces = lazy(/* webpackChunkName: "UserPlaces" */ () => import("@components/UserPlaces"));

export const RenterPagesComponents: PageComponents = {
    MY_RENTS: {
        component: UserRents
    },
    FAVORITE_PLACES: {
        component: UserPlaces
    }
};
