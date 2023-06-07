import { useCallback, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { Icon } from "semantic-ui-react";

import apiUrls from "@api/apiUrls";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import { Place } from "@models/places/types";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

import styles from "./styles/CalendarExporter.module.scss";

interface CalendarExporterProps {
    place: Place;
}

const EXPORT_CALENDAR_TOAST = (placeId: number) => `export-calendar-${placeId}`;

export default function CalendarExporter({ place }: CalendarExporterProps) {
    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const [isCalendarLoading, setIsCalendarLoading] = useState(false);

    const exportCalendar = useCallback(() => {
        setIsCalendarLoading(true);
        toast.loading(`Экспортируем календарь площадки ${place.name}`, {
            id: EXPORT_CALENDAR_TOAST(place.id)
        });

        axios.get<ArrayBuffer>(apiUrls.calendarExportUrl(place.id), { responseType: "arraybuffer" })
            .then((response) => {
                toast.dismiss(EXPORT_CALENDAR_TOAST(place.id));
                const url = URL.createObjectURL(new Blob([response.data], { type: "text/calendar" }));
                const a = document.createElement("a");
                a.href = url;
                a.download = `Календарь ${place.name}.ics`;
                a.click();
                URL.revokeObjectURL(url);
                a.remove();
            })
            .catch(() => {
                toast.error(`При экспорте календаря площадки ${place.name} произошла ошибка. Повторите экспорт позднее`, {
                    id: EXPORT_CALENDAR_TOAST(place.id)
                });
            })
            .finally(() => {
                setIsCalendarLoading(false);
            });
    }, [place.id, place.name]);

    return isMobile
        ? (
            <Icon
                onClick={exportCalendar}
                disable={isCalendarLoading}
                size="large"
                name="download"
            />
        )
        : (
            <SecondaryButton
                className={styles.button}
                onClick={exportCalendar}
                loading={isCalendarLoading}
                disable={isCalendarLoading}
            >
                Экспорт календаря
            </SecondaryButton>
        );
}
