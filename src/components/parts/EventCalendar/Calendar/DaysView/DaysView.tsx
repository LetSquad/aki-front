import { lazy } from "react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import styles from "@parts/EventCalendar/Calendar/DaysView/styles/DaysView.module.scss";
import { useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";

const WeekView = lazy(
    /* webpackChunkName: "WeekView" */ () => import("@parts/EventCalendar/Calendar/DaysView/WeekView/WeekView")
);

const DayView = lazy(
    /* webpackChunkName: "DayView" */ () => import("@parts/EventCalendar/Calendar/DaysView/DayView/DayView")
);

export default function DaysView() {
    const selectedView = useSelectedView();

    return (
        <div className={styles.container}>
            <WithSuspense>
                {selectedView === CalendarView.DAY ? <DayView /> : <WeekView />}
            </WithSuspense>
        </div>
    );
}
