import DaysGrid from "@parts/EventCalendar/Calendar/MonthView/DaysGrid/DaysGrid";
import DaysRow from "@parts/EventCalendar/Calendar/MonthView/DaysRow/DaysRow";

import styles from "./styles/MonthView.module.scss";

export default function MonthView() {
    return (
        <div className={styles.container}>
            <DaysRow />
            <DaysGrid />
        </div>
    );
}
