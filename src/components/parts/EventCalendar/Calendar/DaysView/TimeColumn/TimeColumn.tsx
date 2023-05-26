import { HOURS_OF_DAY_FORMAT_ARRAY } from "@parts/EventCalendar/Calendar/utils";

import styles from "./styles/TimeColumn.module.scss";

export default function TimeColumn() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {HOURS_OF_DAY_FORMAT_ARRAY.map((hour) => (
                    <div
                        className={styles.cell}
                        key={hour}
                    >
                        <div className={styles.cellInner}>
                            {hour}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
