import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const AddPlace = lazy(/* webpackChunkName: "AddPlace" */ () => import("@components/Place/AddPlace"));

export const LandlordPagesComponents: PageComponents = {
    NEW_PLACE: {
        component: AddPlace
    }
};
