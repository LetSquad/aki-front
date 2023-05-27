import React, { useCallback } from "react";

import classNames from "classnames";
import { useFormikContext } from "formik";
import { DateTime } from "luxon";
import { Label } from "semantic-ui-react";

import { getRentSlotDurationTitleFromEnum } from "@coreUtils/utils";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption } from "@models/forms/types";
import { NewRentSlotsDatePeriodsFieldName, NewRentSlotsFieldName, RentSlotDuration } from "@models/rentSlots/enums";
import { OptionalNewRentSlotFormValues } from "@models/rentSlots/types";
import ArrayFormFields from "@parts/EditForm/ArrayFormFields";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

import styles from "./styles/PeriodsFields.module.scss";

const RentSlotDurationOptions: DropdownOption[] = Object.values(RentSlotDuration).map((duration) => ({
    value: duration,
    text: getRentSlotDurationTitleFromEnum(duration)
}));

export default function PeriodsFields() {
    const { values, errors } = useFormikContext<OptionalNewRentSlotFormValues>();

    const lastPeriodEndDateIso = useCallback(() => values[NewRentSlotsFieldName.DATE_PERIOD]?.at(-1)?.dateEnd, [values]);

    const newPeriodStartDateIso = useCallback(() => {
        const isoEndDate = lastPeriodEndDateIso();
        if (!isoEndDate) {
            return DateTime.now().toISODate();
        }

        const endDate = DateTime.fromISO(isoEndDate);

        return endDate.plus({ day: 1 }).toISODate();
    }, [lastPeriodEndDateIso]);

    return (
        <div className={styles.container}>
            <BaseFormFields
                fields={[{
                    type: FormFieldType.FORM_FIELDS_RANGE,
                    label: "Время работы площадки",
                    required: !values[NewRentSlotsFieldName.AROUND_THE_CLOCK],
                    from: {
                        name: NewRentSlotsFieldName.TIME_START,
                        type: FormFieldType.TIMEPICKER,
                        timeIntervals: 60,
                        placeholder: "C",
                        disabled: values[NewRentSlotsFieldName.AROUND_THE_CLOCK]
                    },
                    to: {
                        name: NewRentSlotsFieldName.TIME_END,
                        type: FormFieldType.TIMEPICKER,
                        timeIntervals: 60,
                        placeholder: "До",
                        disabled: values[NewRentSlotsFieldName.AROUND_THE_CLOCK]
                    },
                    name: "rentSlotTimeRange"
                }, {
                    name: NewRentSlotsFieldName.AROUND_THE_CLOCK,
                    label: "Круглосуточно",
                    type: FormFieldType.CHECKBOX
                }, {
                    name: NewRentSlotsFieldName.PRICE,
                    label: "Стоимость аренды",
                    required: true,
                    type: FormFieldType.INPUT,
                    inputType: "number",
                    min: 0,
                    step: 1,
                    labelPosition: "right",
                    inputLabel: "₽",
                    placeholder: "5000"
                }, {
                    name: NewRentSlotsFieldName.DURATION,
                    label: "Минимальная длительность аренды",
                    required: true,
                    type: FormFieldType.DROPDOWN,
                    options: RentSlotDurationOptions,
                    placeholder: "Укажите минимальную длительность аренды"
                }]}
            >
                <ArrayFormFields
                    values={values}
                    initialAddValue={{
                        [NewRentSlotsDatePeriodsFieldName.DATE_START]: newPeriodStartDateIso(),
                        [NewRentSlotsDatePeriodsFieldName.DATE_END]: newPeriodStartDateIso()
                    }}
                    arrayFieldName={NewRentSlotsFieldName.DATE_PERIOD}
                    fields={(index: number) => [{
                        label: "Период оформления слотов аренды",
                        type: FormFieldType.FORM_FIELDS_RANGE,
                        required: true,
                        from: {
                            name: `${NewRentSlotsFieldName.DATE_PERIOD}.${index}.${NewRentSlotsDatePeriodsFieldName.DATE_START}`,
                            type: FormFieldType.DATEPICKER,
                            placeholder: "C",
                            minDate: DateTime.now().plus({ day: 1 }).toJSDate(),
                            maxDate: DateTime.now().plus({ month: 3 }).toJSDate()
                        },
                        to: {
                            name: `${NewRentSlotsFieldName.DATE_PERIOD}.${index}.${NewRentSlotsDatePeriodsFieldName.DATE_END}`,
                            type: FormFieldType.DATEPICKER,
                            minDate: values.datePeriods?.[index]?.dateStart
                                ? DateTime.fromISO(values.datePeriods[index].dateStart).toJSDate()
                                : DateTime.now().plus({ day: 1 }).toJSDate(),
                            maxDate: DateTime.now().plus({ month: 3 }).toJSDate(),
                            placeholder: "До"
                        },
                        name: "rentSlotDatePeriodRange"
                    }]}
                    addButtonTitle="Добавить слот"
                />
                {errors[NewRentSlotsFieldName.DATE_PERIOD] && (
                    <Label className={classNames("pointing", styles.promptLabel)}>
                        {errors[NewRentSlotsFieldName.DATE_PERIOD]}
                    </Label>
                )}
            </BaseFormFields>
        </div>
    );
}
