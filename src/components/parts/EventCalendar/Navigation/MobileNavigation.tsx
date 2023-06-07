import { useExportElement } from "@parts/EventCalendar/EventCalendarContext";
import DateTitle from "@parts/EventCalendar/Navigation/DateTitle/DateTitle";
import DirectionIcons from "@parts/EventCalendar/Navigation/DirectionIcons/DirectionIcons";
import TodayButton from "@parts/EventCalendar/Navigation/TodayButton/TodayButton";
import ViewMenu from "@parts/EventCalendar/Navigation/ViewMenu/ViewMenu";

export default function MobileNavigation() {
    const exportElement = useExportElement();

    return (
        <>
            <DateTitle />
            <DirectionIcons />
            <TodayButton />
            {exportElement && exportElement}
            <ViewMenu />
        </>
    );
}
