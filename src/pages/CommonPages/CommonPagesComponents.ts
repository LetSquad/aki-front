import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const UserCard = lazy(/* webpackChunkName: "UserCard" */ () => import("@components/Profile/UserCard"));
const CurrentUserProfile = lazy(/* webpackChunkName: "CurrentUserProfile" */ () => import("@components/Profile/CurrentUserProfile"));
const Place = lazy(/* webpackChunkName: "Place" */ () => import("@components/Place"));
const PlaceCatalog = lazy(/* webpackChunkName: "PlaceCatalog" */ () => import("@components/PlaceCatalog"));

export const CommonPagesComponents: PageComponents = {
    USER: {
        component: UserCard
    },
    MY_PROFILE: {
        component: CurrentUserProfile
    },
    PLACE: {
        component: Place
    },
    DASHBOARD: {
        component: PlaceCatalog
    }
};
