import { Menu } from "semantic-ui-react";

import { useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { getViewTitleByKey } from "@parts/EventCalendar/Navigation/utils";
import { CalendarView } from "@parts/EventCalendar/types/enums";

import styles from "./styles/DesktopMenu.module.scss";

export interface DesktopMenuProps {
    views: CalendarView[];
    changeView: (newView: CalendarView) => void
}

export default function DesktopMenu({ views, changeView }: DesktopMenuProps) {
    const selectedView = useSelectedView();

    return (
        <Menu className={styles.menu}>
            {views.map((view: CalendarView) => (
                <Menu.Item
                    key={view}
                    name={view}
                    active={selectedView === view}
                    onClick={() => changeView(view)}
                >
                    {getViewTitleByKey(view)}
                </Menu.Item>
            ))}
        </Menu>
    );
}
