import { DateTime } from "luxon";
import * as yup from "yup";

import { NewRentFieldName } from "@models/rent/enums";

const DATE_TIME_START_REQUIRED_MESSAGE = "Необходимо указать дату начала бронирования";

const DATE_TIME_END_REQUIRED_MESSAGE = "Необходимо указать дату окончания бронирования";
const LOWER_DATE_TIME_END_MESSAGE = "Дата окончания бронирования должна быть больше даты начала";

const TIME_START_REQUIRED_MESSAGE = "Необходимо указать время начала бронирования";

const TIME_END_REQUIRED_MESSAGE = "Необходимо указать время окончания бронирования";
const LOWER_TIME_END_MESSAGE = "Время окончания бронирования должно быть больше времени начала";

const DATE_REQUIRED_MESSAGE = "Необходимо указать дату бронирования";

export const byDaysValidationSchema = yup.object()
    .shape({
        [NewRentFieldName.DATE_TIME_START]: yup.string()
            .required(DATE_TIME_START_REQUIRED_MESSAGE),
        [NewRentFieldName.DATE_TIME_END]: yup.string()
            .required(DATE_TIME_END_REQUIRED_MESSAGE)
            .test(
                "isStartDateTimeLowerDateTimeEnd",
                LOWER_DATE_TIME_END_MESSAGE,
                (dateTimeEnd, testContext) => (
                    !!dateTimeEnd &&
                    !!testContext.parent.dateTimeStart &&
                    DateTime.fromISO(dateTimeEnd) >= DateTime.fromISO(testContext.parent.dateTimeStart)
                )
            )
    });

export const byHoursValidationSchema = yup.object()
    .shape({
        [NewRentFieldName.TIME_START]: yup.string()
            .required(TIME_START_REQUIRED_MESSAGE),
        [NewRentFieldName.TIME_END]: yup.string()
            .required(TIME_END_REQUIRED_MESSAGE)
            .test(
                "isStartTimeLowerTimeEnd",
                LOWER_TIME_END_MESSAGE,
                (timeEnd, testContext) => (
                    !!timeEnd &&
                    !!testContext.parent.timeStart &&
                    DateTime.fromISO(timeEnd) > DateTime.fromISO(testContext.parent.timeStart)
                )
            ),
        [NewRentFieldName.DATE]: yup.string()
            .required(DATE_REQUIRED_MESSAGE)
    });
