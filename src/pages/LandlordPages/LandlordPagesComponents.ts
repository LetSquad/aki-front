import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const AddPlace = lazy(/* webpackChunkName: "AddPlace" */ () => import("@components/Place/AddPlace"));
const UserPlaces = lazy(/* webpackChunkName: "UserPlaces" */ () => import("@components/UserPlaces"));
const Schedule = lazy(/* webpackChunkName: "Schedule" */ () => import("@components/Schedule"));

export const LandlordPagesComponents: PageComponents = {
    NEW_PLACE: {
        component: AddPlace
    },
    MY_PLACES: {
        component: UserPlaces
    },
    PLACE_SCHEDULE: {
        component: Schedule
    }
};
