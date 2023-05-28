import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const UserPlaces = lazy(/* webpackChunkName: "UserPlaces" */ () => import("@components/UserPlaces"));

export const AdminPagesComponents: PageComponents = {
    UNVERIFIED_PLACES: {
        component: UserPlaces
    }
};
