import { DateTime } from "luxon";
import * as yup from "yup";

import { NewRentSlotsDatePeriodsFieldName, NewRentSlotsFieldName } from "@models/rentSlots/enums";

const TIME_START_REQUIRED_MESSAGE = "Необходимо указать время начала работы площадки";

const TIME_END_REQUIRED_MESSAGE = "Необходимо указать время окончания работы площадки";
const LOWER_TIME_END_MESSAGE = "Время окончания работы площадки должно быть больше времени начала";

const PRICE_REQUIRED_MESSAGE = "Необходимо указать стоимость";
const PRICE_INVALID_MESSAGE = "Стоимость должна быть больше 0";

const DATE_PERIOD_REQUIRED_MESSAGE = "Нужно добавить хотя бы один диапазон дат для слотов";

const DATE_START_REQUIRED_MESSAGE = "Необходимо указать дату начала периода слотов аренды";

const DATE_END_REQUIRED_MESSAGE = "Необходимо указать дату окончания периода слотов аренды";
const LOWER_DATE_END_MESSAGE = "Дата окончания периода слотов аренды должна быть больше даты начала";

export const validationSchema = yup.object()
    .shape({
        [NewRentSlotsFieldName.TIME_START]: yup.string()
            .required(TIME_START_REQUIRED_MESSAGE)
    })
    .shape({
        [NewRentSlotsFieldName.TIME_END]: yup.string()
            .required(TIME_END_REQUIRED_MESSAGE)
            .test(
                "isStartTimeLowerTimeEnd",
                LOWER_TIME_END_MESSAGE,
                (timeEnd, testContext) => (
                    !!timeEnd &&
                    !!testContext.parent.timeStart &&
                    DateTime.fromISO(timeEnd) > DateTime.fromISO(testContext.parent.timeStart)
                )
            )
    })
    .shape({
        [NewRentSlotsFieldName.PRICE]: yup.number()
            .required(PRICE_REQUIRED_MESSAGE)
            .min(0, PRICE_INVALID_MESSAGE)
    })
    .shape({
        [NewRentSlotsFieldName.DATE_PERIOD]: yup.array()
            .of(
                yup.object().shape({
                    [NewRentSlotsDatePeriodsFieldName.DATE_START]: yup.string()
                        .required(DATE_START_REQUIRED_MESSAGE),
                    [NewRentSlotsDatePeriodsFieldName.DATE_END]: yup.string()
                        .required(DATE_END_REQUIRED_MESSAGE)
                        .test(
                            "isDateStartLowerEndDate",
                            LOWER_DATE_END_MESSAGE,
                            (dateEnd, testContext) => (
                                !!dateEnd &&
                                !!testContext.parent.dateStart &&
                                DateTime.fromISO(dateEnd) >= DateTime.fromISO(testContext.parent.dateStart)
                            )
                        )
                })
            )
            .required(DATE_PERIOD_REQUIRED_MESSAGE)
            .min(1, DATE_PERIOD_REQUIRED_MESSAGE)
    });
