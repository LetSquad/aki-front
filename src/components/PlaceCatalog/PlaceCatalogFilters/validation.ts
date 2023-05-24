import { DateTime } from "luxon";
import * as yup from "yup";

import { PlacesFiltersFieldsName } from "@models/places/enums";

const MAX_PRICE_LOWER_THEN_MIN_MESSAGE = "Максимальная стоимость должна быть больше или равна минимальной";
const PRICE_INVALID_MESSAGE = "Стоимость должна быть положительной";

const MAX_CAPACITY_LOWER_THEN_MIN_MESSAGE = "Максимальная вместимость должна быть больше или равно минимальной";
const CAPACITY_INVALID_MESSAGE = "Максимальная вместимость должна быть больше 0";

const MAX_SQUARE_LOWER_THEN_MIN_MESSAGE = "Максимальная площадь должна быть больше или равна минимальной";
const SQUARE_INVALID_MESSAGE = "Площадь должна быть больше 0";

const MAX_LEVEL_NUMBER_LOWER_THEN_MIN_MESSAGE = "Максимальная этаж должен быть больше или равен минимальному";

const DATE_TO_LOWER_THEN_FROM_MESSAGE = "Дата \"до\" должна быть больше или равна дате \"с\"";

export const validationSchema = yup.object()
    .shape({
        [PlacesFiltersFieldsName.PRICE_MIN]: yup.number()
            .min(0, PRICE_INVALID_MESSAGE)
            .optional(),
        [PlacesFiltersFieldsName.PRICE_MAX]: yup.number()
            .min(0, PRICE_INVALID_MESSAGE)
            .test(
                "isMaxPriceCorrect",
                MAX_PRICE_LOWER_THEN_MIN_MESSAGE,
                (priceMax, testContext) => {
                    const { priceMin } = (testContext as yup.TestContextExtended).parent;

                    if (priceMin === undefined || priceMax === undefined) {
                        return true;
                    }

                    return priceMin <= priceMax;
                }
            )
            .optional(),
        [PlacesFiltersFieldsName.CAPACITY_MIN]: yup.number()
            .min(1, CAPACITY_INVALID_MESSAGE)
            .optional(),
        [PlacesFiltersFieldsName.CAPACITY_MAX]: yup.number()
            .min(1, CAPACITY_INVALID_MESSAGE)
            .test(
                "isMaxCapacityCorrect",
                MAX_CAPACITY_LOWER_THEN_MIN_MESSAGE,
                (capacityMax, testContext) => {
                    const { capacityMin } = (testContext as yup.TestContextExtended).parent;

                    if (capacityMin === undefined || capacityMax === undefined) {
                        return true;
                    }

                    return capacityMin <= capacityMax;
                }
            )
            .optional(),
        [PlacesFiltersFieldsName.SQUARE_MIN]: yup.number()
            .min(1, SQUARE_INVALID_MESSAGE)
            .optional(),
        [PlacesFiltersFieldsName.SQUARE_MAX]: yup.number()
            .min(1, SQUARE_INVALID_MESSAGE)
            .test(
                "isMaxSquareCorrect",
                MAX_SQUARE_LOWER_THEN_MIN_MESSAGE,
                (squareMax, testContext) => {
                    const { squareMin } = (testContext as yup.TestContextExtended).parent;

                    if (squareMin === undefined || squareMax === undefined) {
                        return true;
                    }

                    return squareMin <= squareMax;
                }
            )
            .optional(),
        [PlacesFiltersFieldsName.LEVEL_NUMBER_MAX]: yup.number()
            .test(
                "isMaxLevelNumberCorrect",
                MAX_LEVEL_NUMBER_LOWER_THEN_MIN_MESSAGE,
                (levelNumberMax, testContext) => {
                    const { levelNumberMin } = (testContext as yup.TestContextExtended).parent;

                    if (levelNumberMin === undefined || levelNumberMax === undefined) {
                        return true;
                    }

                    return levelNumberMin <= levelNumberMax;
                }
            )
            .optional(),
        [PlacesFiltersFieldsName.DATE_TO]: yup.string()
            .test(
                "isDateToCorrect",
                DATE_TO_LOWER_THEN_FROM_MESSAGE,
                (dateTo, testContext) => {
                    const { dateFrom } = (testContext as yup.TestContextExtended).parent;

                    if (dateTo === undefined || dateFrom === undefined) {
                        return true;
                    }

                    return DateTime.fromISO(dateFrom) <= DateTime.fromISO(dateTo);
                }
            )
            .optional()
    });
