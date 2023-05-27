import { CalendarView } from "@parts/EventCalendar/types/enums";

export function getViewTitleByKey(view: CalendarView) {
    switch (view) {
        case CalendarView.DAY: {
            return "День";
        }
        case CalendarView.WEEK: {
            return "Неделя";
        }
        case CalendarView.MONTH: {
            return "Месяц";
        }
        // skip default
    }
}
