import { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { DateTime } from "luxon";
import { Label } from "semantic-ui-react";

import { DatePickerFieldProps } from "@models/forms/types";

import "./styles/DatePickerField.module.scss";

const { default: ru } = await import(/* webpackChunkName: "date-fns-ru" */ "date-fns/locale/ru");

const datePicker = await import(/* webpackChunkName: "react-datepicker" */ "react-datepicker");
const DatePicker = datePicker.default;

datePicker.registerLocale("ru-RU", ru);

export default function DatePickerField({
    name,
    label,
    className,
    placeholder,
    required = false,
    maxDate,
    minDate,
    dateFormat = "dd.MM.yyyy",
    onChange: additionalOnChange
}: DatePickerFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | undefined>({ name, type: "select" });

    const formatJSDate = useCallback((date: Date) => DateTime.fromJSDate(date).toISODate() as string, []);

    const setTouchedTrue = useCallback(() => setTouched(true), [setTouched]);

    const changeDateValue = useCallback((date: Date) => {
        const formatTime = formatJSDate(date);

        if (additionalOnChange) {
            additionalOnChange(formatTime);
        }

        setValue(formatTime);
    }, [additionalOnChange, formatJSDate, setValue]);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <div className={classNames(
            "field",
            {
                required,
                error: isErrorDisplay
            },
            className
        )}
        >
            {label && (
                <label
                    htmlFor={name}
                    className="label"
                >
                    {label}
                </label>
            )}
            <DatePicker
                name={name}
                selected={value ? DateTime.fromISO(value).toJSDate() : undefined}
                onSelect={changeDateValue}
                onChange={changeDateValue}
                maxDate={maxDate}
                minDate={minDate}
                showMonthDropdown
                showYearDropdown
                locale="ru-RU"
                placeholderText={placeholder}
                dateFormat={dateFormat}
                required={required}
                onBlur={setTouchedTrue}
            />
            {isErrorDisplay && (
                <Label
                    pointing
                    prompt
                >
                    {error}
                </Label>
            )}
        </div>
    );
}
