import { lazy, useMemo } from "react";

import { Route, Routes as RouterRoutes } from "react-router-dom";

import NotFoundErrorScreen from "@coreUtils/NotFoundErrorScreen";
import { UserRole } from "@models/users/enums";
import { AdminPages } from "@pages/AdminPages/AdminPages";
import { CommonPages } from "@pages/CommonPages/CommonPages";
import { LandlordPages } from "@pages/LandlordPages/LandlordPages";
import { RenterPages } from "@pages/RenterPages/RenterPages";
import { pagesToRoutes } from "@pages/utils";
import { useAppSelector } from "@store/hooks";
import { selectUserRole } from "@store/info/selectors";
import { selectCurrentUserRole } from "@store/user/selectors";

const PlaceCatalog = lazy(/* webpackChunkName: "PlaceCatalog" */ () => import("@components/PlaceCatalog"));

export default function Routes() {
    const currentUserRole = useAppSelector(selectCurrentUserRole);
    const userRole = useAppSelector(selectUserRole);

    const role = currentUserRole ?? userRole;

    const pages = useMemo(() => {
        switch (role) {
            case UserRole.RENTER: {
                return RenterPages;
            }
            case UserRole.LANDLORD: {
                return LandlordPages;
            }
            case UserRole.ADMIN: {
                return AdminPages;
            }
            default: {
                return RenterPages;
            }
        }
    }, [role]);

    return (
        <RouterRoutes>
            <Route
                key="dashboard"
                path="/"
                element={<PlaceCatalog />}
            />
            {pagesToRoutes(pages)}
            {pagesToRoutes(CommonPages)}
            <Route
                key="not-found"
                path="*"
                element={<NotFoundErrorScreen />}
            />
        </RouterRoutes>
    );
}
