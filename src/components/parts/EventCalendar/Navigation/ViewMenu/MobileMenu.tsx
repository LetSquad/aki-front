import { Dropdown } from "semantic-ui-react";

import { useSelectedView } from "@parts/EventCalendar/EventCalendarContext";
import { getViewTitleByKey } from "@parts/EventCalendar/Navigation/utils";
import { CalendarView } from "@parts/EventCalendar/types/enums";

import styles from "./styles/MobileMenu.module.scss";

export interface MobileMenuProps {
    views: CalendarView[];
    changeView: (newView: CalendarView) => void
}

export default function MobileMenu({ views, changeView }: MobileMenuProps) {
    const selectedView = useSelectedView();

    return (
        <Dropdown
            className={styles.dropdownIcon}
            direction="left"
            icon="bars"
        >
            <Dropdown.Menu>
                {views.map((view: CalendarView) => (
                    <Dropdown.Item
                        key={view}
                        name={view}
                        active={selectedView === view}
                        onClick={() => changeView(view)}
                    >
                        {getViewTitleByKey(view)}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
