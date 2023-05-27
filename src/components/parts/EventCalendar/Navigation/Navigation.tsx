import { lazy } from "react";

import { useMediaQuery } from "react-responsive";

import { WithSuspense } from "@coreUtils/WithSuspense";
import styles from "@parts/EventCalendar/Navigation/styles/Navigation.module.scss";

const DesktopNavigation = lazy(
    /* webpackChunkName: "DesktopNavigation" */ () => import("@parts/EventCalendar/Navigation/DesktopNavigation")
);

const MobileNavigation = lazy(
    /* webpackChunkName: "MobileNavigation" */ () => import("@parts/EventCalendar/Navigation/MobileNavigation")
);

export default function Navigation() {
    const isMobile = useMediaQuery({ maxWidth: 650 });

    return (
        <WithSuspense>
            <div className={styles.container}>
                {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
            </div>
        </WithSuspense>
    );
}
