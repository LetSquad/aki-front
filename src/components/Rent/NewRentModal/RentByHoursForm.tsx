import React, { useMemo } from "react";

import { useFormikContext } from "formik";
import { DateTime } from "luxon";

import { FormFieldType } from "@models/forms/enums";
import { NewRentFieldName } from "@models/rent/enums";
import { NewRentByHoursFormValues } from "@models/rent/types";
import { RentSlot } from "@models/rentSlots/types";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

import styles from "./styles/Forms.module.scss";

interface RentByHoursFormProps {
    rentSlots: RentSlot[];
}

export default function RentByHoursForm({ rentSlots }: RentByHoursFormProps) {
    const { values } = useFormikContext<NewRentByHoursFormValues>();

    const includeDates = useMemo(() => rentSlots.map((rentSlot) => DateTime.fromISO(rentSlot.timeStart).toJSDate()), [rentSlots]);
    const includeTimes = useMemo(() => {
        const selectedDateIso = values[NewRentFieldName.DATE];
        if (!selectedDateIso) {
            return [];
        }

        const selectedDate = DateTime.fromISO(selectedDateIso);

        return rentSlots
            .map((rentSlot) => DateTime.fromISO(rentSlot.timeStart))
            .filter((rentSlotTime) => (
                rentSlotTime.day === selectedDate.day &&
                rentSlotTime.month === selectedDate.month &&
                rentSlotTime.year === selectedDate.year
            ))
            .map((rentSlotTime) => rentSlotTime.toJSDate());
    }, [rentSlots, values]);

    const includeEndTimes = useMemo(() => {
        const selectedDateIso = values[NewRentFieldName.DATE];
        if (!selectedDateIso) {
            return [];
        }

        const startTimeIso = values[NewRentFieldName.TIME_START];
        if (!startTimeIso) {
            return [];
        }

        const selectedDate = DateTime.fromISO(selectedDateIso);
        const startTime = DateTime.fromISO(startTimeIso).set({
            day: selectedDate.day,
            month: selectedDate.month,
            year: selectedDate.year
        });

        const rentSlotsTimes = rentSlots
            .map((rentSlot) => DateTime.fromISO(rentSlot.timeEnd))
            .filter((rentSlotTime) => (
                rentSlotTime > startTime &&
                rentSlotTime.day === startTime.day &&
                rentSlotTime.month === startTime.month &&
                rentSlotTime.year === startTime.year
            ));

        let i = 0;
        const eligibleRentSlotsTimes = [];

        do {
            eligibleRentSlotsTimes.push(rentSlotsTimes[i]);
            i += 1;
        } while (!!rentSlotsTimes[i] && Math.abs(rentSlotsTimes[i].diff(rentSlotsTimes[i - 1], "hours").hours) === 1);

        return eligibleRentSlotsTimes.map((rentSlotTime) => rentSlotTime.toJSDate());
    }, [rentSlots, values]);

    return (
        <div className={styles.container}>
            <BaseFormFields
                fields={[{
                    name: NewRentFieldName.DATE,
                    type: FormFieldType.DATEPICKER,
                    label: "Дата аренды",
                    required: true,
                    placeholder: "Введите дату аренды",
                    includeDates,
                    className: styles.field
                }, {
                    type: FormFieldType.FORM_FIELDS_RANGE,
                    label: "Время аренды",
                    required: true,
                    from: {
                        name: NewRentFieldName.TIME_START,
                        type: FormFieldType.TIMEPICKER,
                        placeholder: "C",
                        disabled: !values[NewRentFieldName.DATE],
                        includeTimes,
                        timeIntervals: 60,
                        className: styles.field
                    },
                    to: {
                        name: NewRentFieldName.TIME_END,
                        type: FormFieldType.TIMEPICKER,
                        placeholder: "До",
                        includeTimes: includeEndTimes,
                        disabled: !values[NewRentFieldName.TIME_START],
                        timeIntervals: 60,
                        className: styles.field
                    },
                    name: "rentTimeRange"
                }]}
            />
        </div>
    );
}
