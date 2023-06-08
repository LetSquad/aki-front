import React, { useMemo } from "react";

import { useFormikContext } from "formik";
import { DateTime } from "luxon";

import { FormFieldType } from "@models/forms/enums";
import { NewRentFieldName } from "@models/rent/enums";
import { NewRentByDaysFormValues } from "@models/rent/types";
import { RentSlot } from "@models/rentSlots/types";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

import styles from "./styles/Forms.module.scss";

interface RentByDaysFormProps {
    rentSlots: RentSlot[];
}

export default function RentByDaysForm({ rentSlots }: RentByDaysFormProps) {
    const { values } = useFormikContext<NewRentByDaysFormValues>();

    const includeDates = useMemo(() => rentSlots.map((rentSlot) => DateTime.fromISO(rentSlot.timeStart).toJSDate()), [rentSlots]);
    const includeEndDates = useMemo(() => {
        const startDateIso = values[NewRentFieldName.DATE_TIME_START];
        if (!startDateIso) {
            return [];
        }

        const startDate = DateTime.fromISO(startDateIso);

        const rentSlotsDates = rentSlots
            .map((rentSlot) => DateTime.fromISO(rentSlot.timeStart))
            .filter((rentSlotDate) => rentSlotDate >= startDate)
            .sort((firstDate, secondDate) => {
                if (firstDate < secondDate) {
                    return -1;
                }

                if (firstDate > secondDate) {
                    return 1;
                }

                return 0;
            });

        let i = 0;
        const eligibleRentSlotsDates = [];

        do {
            eligibleRentSlotsDates.push(rentSlotsDates[i]);
            i += 1;
        } while (!!rentSlotsDates[i] && Math.abs(rentSlotsDates[i].diff(rentSlotsDates[i - 1], "days").days) === 1);

        return eligibleRentSlotsDates.map((rentSlotDate) => rentSlotDate.toJSDate());
    }, [rentSlots, values]);

    return (
        <div className={styles.container}>
            <BaseFormFields
                fields={[{
                    type: FormFieldType.FORM_FIELDS_RANGE,
                    label: "Срок аренды",
                    required: true,
                    from: {
                        name: NewRentFieldName.DATE_TIME_START,
                        type: FormFieldType.DATEPICKER,
                        placeholder: "C",
                        includeDates,
                        className: styles.field
                    },
                    to: {
                        name: NewRentFieldName.DATE_TIME_END,
                        type: FormFieldType.DATEPICKER,
                        placeholder: "До",
                        includeDates: includeEndDates,
                        disabled: !values[NewRentFieldName.DATE_TIME_START],
                        className: styles.field
                    },
                    name: "rentDateRange"
                }]}
            />
        </div>
    );
}
