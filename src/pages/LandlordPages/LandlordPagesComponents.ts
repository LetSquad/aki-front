import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const AddPlace = lazy(/* webpackChunkName: "AddPlace" */ () => import("@components/Place/AddPlace"));
const UserPlaces = lazy(/* webpackChunkName: "UserPlaces" */ () => import("@components/UserPlaces"));

export const LandlordPagesComponents: PageComponents = {
    NEW_PLACE: {
        component: AddPlace
    },
    MY_PLACES: {
        component: UserPlaces
    }
};
