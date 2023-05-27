import { Info } from "luxon";

import { capitalizeFirstLetter } from "@coreUtils/utils";

import styles from "./styles/DaysRow.module.scss";

export default function DaysRow() {
    return (
        <div className={styles.container}>
            {Info.weekdays("short").map((day) => (
                <div
                    key={`daysRow-${day}`}
                    className={styles.day}
                >
                    {capitalizeFirstLetter(day)}
                </div>
            ))}
        </div>
    );
}
