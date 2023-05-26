import { useMemo } from "react";

import classNames from "classnames";
import { DateTime } from "luxon";

import { capitalizeFirstLetter, isSameDate } from "@coreUtils/utils";

import styles from "./styles/DayTitle.module.scss";

interface DayTitleProps {
    day: DateTime;
    className?: string
}

export default function DayTitle({ day, className }: DayTitleProps) {
    const isToday = useMemo(() => isSameDate(day, DateTime.now()), [day]);

    return (
        <div className={classNames(className, styles.container)}>
            <span className={styles.weekday}>{capitalizeFirstLetter(day.toFormat("ccc", { locale: "ru" }))}</span>
            <div className={styles.title}>
                <span className={classNames(styles.day, { [styles.today]: isToday })}>
                    {day.toFormat("dd", { locale: "ru" })}
                </span>
            </div>
        </div>
    );
}
