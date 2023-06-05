import {
    CSSProperties,
    MouseEvent,
    useCallback,
    useMemo
} from "react";

import classNames from "classnames";
import { Link } from "react-router-dom";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { getEventColorByStatus } from "@parts/EventCalendar/Calendar/utils";
import { useOnEventClick } from "@parts/EventCalendar/EventCalendarContext";
import { CalendarEvent } from "@parts/EventCalendar/types/types";

import styles from "./styles/Event.module.scss";

interface EventProps {
    className?: string;
    linkClassName?: string;
    event: CalendarEvent;
    title?: string;
    customStyle?: CSSProperties;
    wide?: boolean;
}

export default function Event({
    className,
    linkClassName,
    event,
    title,
    customStyle,
    wide = true
}: EventProps) {
    const onEventClick = useOnEventClick();

    const onEventClickHandler = useCallback((domEvent: MouseEvent<HTMLButtonElement>) => {
        domEvent.stopPropagation();
        if (onEventClick && !event.linkTo) {
            onEventClick(event, domEvent);
        }
    }, [event, onEventClick]);

    const eventComponent = useMemo(() => (
        <PrimaryButton
            className={classNames(
                styles.event,
                className,
                {
                    [styles.eventDisabled]: !onEventClick && !event.linkTo,
                    [styles.eventWide]: wide
                }
            )}
            onClick={onEventClickHandler}
            style={customStyle}
            color={getEventColorByStatus(event.status)}
        >
            {title || event.title}
        </PrimaryButton>
    ), [className, customStyle, event.linkTo, event.status, event.title, onEventClick, onEventClickHandler, title, wide]);

    return event.linkTo
        ? (
            <Link
                className={classNames(
                    linkClassName,
                    styles.link,
                    { [styles.linkWide]: wide }
                )}
                to={event.linkTo}
                target="_blank"
                style={customStyle}
            >
                {eventComponent}
            </Link>
        )
        : eventComponent;
}
