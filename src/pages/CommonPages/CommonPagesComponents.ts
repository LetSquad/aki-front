import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const UserCard = lazy(/* webpackChunkName: "UserCard" */ () => import("@components/Profile/UserCard"));
const CurrentUserProfile = lazy(/* webpackChunkName: "CurrentUserProfile" */ () => import("@components/Profile/CurrentUserProfile"));
const Place = lazy(/* webpackChunkName: "Place" */ () => import("@components/Place"));

export const CommonPagesComponents: PageComponents = {
    USER: {
        component: UserCard
    },
    MY_PROFILE: {
        component: CurrentUserProfile
    },
    PLACE: {
        component: Place
    }
};
