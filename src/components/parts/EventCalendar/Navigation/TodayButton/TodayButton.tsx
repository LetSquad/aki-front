import { useCallback } from "react";

import { DateTime } from "luxon";
import { useMediaQuery } from "react-responsive";
import { Icon } from "semantic-ui-react";

import SecondaryButton from "@parts/Buttons/SecondaryButton";
import { useSetSelectedDate } from "@parts/EventCalendar/EventCalendarContext";

import styles from "./styles/TodayButton.module.scss";

export default function TodayButton() {
    const isMobile = useMediaQuery({ maxWidth: 650 });

    const setSelectedDate = useSetSelectedDate();

    const onClickToday = useCallback(() => setSelectedDate(DateTime.now()), [setSelectedDate]);

    return isMobile
        ? (
            <Icon
                name="calendar check outline"
                onClick={onClickToday}
                size="large"
            />
        )
        : (
            <SecondaryButton
                onClick={onClickToday}
                className={styles.todayButton}
            >
                Сегодня
            </SecondaryButton>
        );
}
