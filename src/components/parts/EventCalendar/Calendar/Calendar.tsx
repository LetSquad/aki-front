import { lazy } from "react";

import { Dimmer, Loader } from "semantic-ui-react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { useIsLoading, useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";

import styles from "./styles/Calendar.module.scss";

const MonthView = lazy(
    /* webpackChunkName: "MonthView" */ () => import("@parts/EventCalendar/Calendar/MonthView/MonthView")
);

const DaysView = lazy(
    /* webpackChunkName: "DaysView" */ () => import("@parts/EventCalendar/Calendar/DaysView/DaysView")
);

export default function Calendar() {
    const selectedView = useSelectedView();
    const isLoading = useIsLoading();

    return (
        <div className={styles.container}>
            {isLoading && (
                <Dimmer
                    inverted
                    active
                >
                    <Loader />
                </Dimmer>
            )}
            <WithSuspense>
                {selectedView === CalendarView.MONTH ? <MonthView /> : <DaysView />}
            </WithSuspense>
        </div>
    );
}
