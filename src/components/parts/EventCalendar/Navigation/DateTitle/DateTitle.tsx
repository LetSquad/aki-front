import { capitalizeFirstLetter } from "@coreUtils/utils";
import { useSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import styles from "./styles/DateTitle.module.scss";

export default function DateTitle() {
    const selectedDate = useSelectedDate();

    return (
        <span className={styles.date}>
            {`${capitalizeFirstLetter(selectedDate.toFormat("LLLL", { locale: "ru" }))} ${selectedDate.year}`}
        </span>
    );
}
