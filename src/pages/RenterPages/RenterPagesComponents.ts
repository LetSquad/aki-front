import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const UserRents = lazy(/* webpackChunkName: "UserRents" */ () => import("@components/Rent/UserRents"));

export const RenterPagesComponents: PageComponents = {
    MY_RENTS: {
        component: UserRents
    }
};
