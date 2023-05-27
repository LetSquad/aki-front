import { lazy, useCallback, useMemo } from "react";

import { useMediaQuery } from "react-responsive";

import { WithSuspense } from "@coreUtils/WithSuspense";
import {
    useDisabledViews,
    useSelectedDate,
    useSetSelectedDate,
    useSetSelectedView
} from "@parts/EventCalendar/EventCalendarContext";
import { CalendarView } from "@parts/EventCalendar/types/enums";

const DesktopMenu = lazy(
    /* webpackChunkName: "DesktopMenu" */ () => import("@parts/EventCalendar/Navigation/ViewMenu/DesktopMenu")
);

const MobileMenu = lazy(
    /* webpackChunkName: "MobileMenu" */ () => import("@parts/EventCalendar/Navigation/ViewMenu/MobileMenu")
);

export default function ViewMenu() {
    const isMobile = useMediaQuery({ maxWidth: 650 });

    const disabledView = useDisabledViews();
    const selectedDate = useSelectedDate();
    const setSelectedView = useSetSelectedView();
    const setSelectedDate = useSetSelectedDate();

    const availableViews = useMemo(() => Object.values(CalendarView).filter((view) => !disabledView.includes(view)), [disabledView]);

    const changeView = useCallback((newView: CalendarView) => {
        switch (newView) {
            case CalendarView.DAY: {
                setSelectedView(newView);
                break;
            }
            case CalendarView.WEEK: {
                setSelectedView(newView);
                setSelectedDate(selectedDate.minus({ day: selectedDate.weekday - 1 }));
                break;
            }
            case CalendarView.MONTH: {
                setSelectedView(newView);
                setSelectedDate(selectedDate.set({ day: 1 }));
            }
            // skip default
        }
    }, [selectedDate, setSelectedDate, setSelectedView]);

    const menu = useMemo(() => (
        <WithSuspense>
            {
                isMobile
                    ? (
                        <MobileMenu
                            views={availableViews}
                            changeView={changeView}
                        />
                    )
                    : (
                        <DesktopMenu
                            views={availableViews}
                            changeView={changeView}
                        />
                    )
            }
        </WithSuspense>
    ), [availableViews, changeView, isMobile]);

    return availableViews.length > 0
        ? menu
        : null;
}
