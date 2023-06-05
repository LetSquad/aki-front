import * as yup from "yup";

import {
    BASE_CYRILLIC_AND_LATIN_REG_EXP,
    BASE_CYRILLIC_REG_EXP,
    IMAGE_MAX_SIZE,
    PHONE_REG_EXP,
    URL_REG_EXP
} from "@coreUtils/constants";
import {
    PlaceCoordinatesFieldsName,
    PlaceEquipmentFieldsName,
    PlaceFacilityFieldsName,
    PlaceFieldsName,
    PlacePriceFieldsName,
    PlaceServiceFieldsName,
    PriceType
} from "@models/places/enums";

const AMOUNT_OF_PLACE_NAME_CHARACTERS = {
    min: 1,
    max: 50
};
const PLACE_NAME_INVALID_MESSAGE = "Название площадки должно состоять не более, чем из 50 кириллических букв и символов";
const PLACE_NAME_REQUIRED_MESSAGE = "Название площадки должно быть указано";

const AMOUNT_OF_PLACE_DESCRIPTION_CHARACTERS = {
    min: 1,
    max: 500
};
const PLACE_DESCRIPTION_INVALID_MESSAGE = "Описание площадки должно состоять не более, чем из 500 символов";
const PLACE_DESCRIPTION_REQUIRED_MESSAGE = "Описание площадки должно быть указано";

const PHONE_INVALID_MESSAGE = "Введите корректный номер телефона";
const PHONE_REQUIRED_MESSAGE = "Необходимо ввести номер телефона";

const EMAIL_INVALID_MESSAGE = "Введите корректный адрес электронной почты";
const EMAIL_REQUIRED_MESSAGE = "Необходимо ввести адрес электронной почты";

const SITE_INVALID_MESSAGE = "Введите корректный адрес сайта";
const SITE_REQUIRED_MESSAGE = "Необходимо ввести адрес сайта";

const AMOUNT_OF_PLACE_ADDRESS_CHARACTERS = {
    min: 1
};
const PLACE_ADDRESS_INVALID_MESSAGE = "Адрес площадки должен состоять только из кириллических букв и символов";
const PLACE_ADDRESS_REQUIRED_MESSAGE = "Адрес площадки должен быть указан";

const PRICE_REQUIRED_MESSAGE = "Необходимо указать стоимость больше 0, если выбран тип цены не \"Бесплатно\"";

const AMOUNT_OF_MAX_CAPACITY_CHARACTERS = {
    min: 1,
    max: 10_000
};

const MAX_CAPACITY_LOWER_THEN_MIN_MESSAGE = "Максимальная вместимость человек должно быть больше или равно минимальной";
const MAX_CAPACITY_INVALID_MESSAGE = "Максимальная вместимость должна быть больше 0";
const MAX_CAPACITY_INVALID_MAX_MESSAGE = "Максимальная вместимость должна быть не более 10000 человек";

const AMOUNT_OF_MIN_CAPACITY_CHARACTERS = {
    min: 1,
    max: 10_000
};

const MIN_CAPACITY_INVALID_MESSAGE = "Минимальная вместимость должно быть больше 0";
const MIN_CAPACITY_INVALID_MAX_MESSAGE = "Максимальная вместимость должна быть не более 10000 человек";

const AMOUNT_OF_FREE_SQUARE_CHARACTERS = {
    min: 1,
    max: 1_000_000
};

const FREE_SQUARE_BIGGER_THEN_FULL_MESSAGE = "Свободная площадь должна быть меньше или равна полной";
const FREE_SQUARE_REQUIRE_MESSAGE = "Свободная площадь должна быть больше 0";
const FREE_SQUARE_INVALID_MAX_MESSAGE = "Свободная площадь должна быть не более 1000000 м²";

const AMOUNT_OF_FULL_SQUARE_CHARACTERS = {
    min: 1,
    max: 1_000_000
};

const FULL_SQUARE_REQUIRE_MESSAGE = "Общая площадь должна быть больше 0";
const FULL_SQUARE_INVALID_MAX_MESSAGE = "Общая площадь должна быть не более  1000000 м²";

const AMOUNT_OF_LEVEL_NUMBER_CHARACTERS = {
    min: -20,
    max: 120
};

const LEVEL_NUMBER_INVALID_MESSAGE = "Этаж размещения должен быть не меньше -20 и не больше 120";

const AMOUNT_OF_PLACE_FACILITY_NAME_CHARACTERS = {
    min: 1
};
const PLACE_FACILITY_NAME_REQUIRED_MESSAGE = "Название удобства должно быть указано";

const PLACE_FACILITY_COUNT_REQUIRED_MESSAGE = "Количество удобств должно быть больше 1 или не быть указано";

const AMOUNT_OF_PLACE_SERVICE_NAME_CHARACTERS = {
    min: 1
};
const PLACE_SERVICE_NAME_REQUIRED_MESSAGE = "Название услуги должно быть указано";

const AMOUNT_OF_PLACE_EQUIPMENT_NAME_CHARACTERS = {
    min: 1
};
const PLACE_EQUIPMENT_NAME_REQUIRED_MESSAGE = "Название оборудования должно быть указано";

const PLACE_EQUIPMENT_COUNT_REQUIRED_MESSAGE = "Количество оборудования должно быть больше 1 или не быть указано";

const PLACE_IMAGE_MAX_SIZE_INVALID_MESSAGE = "Размер изображения не должен превышать 10 МБ";
const AMOUNT_OF_PLACE_IMAGES_CHARACTERS = {
    max: 10
};
const PLACE_IMAGES_INVALID_COUNT_MESSAGE = "Количество изображений не должно быть больше 10";

const PLACE_LATITUDE_INVALID_MESSAGE = "Широта должна быть указана в корректном формате с указанием градусов и минут: 55.7525391";
const PLACE_LONGITUDE_INVALID_MESSAGE = "Долгота должна быть указана в корректном формате с указанием градусов и минут: 37.6218525";

const priceValidationSchema = yup.object()
    .shape({
        [PlacePriceFieldsName.PRICE]: yup.number()
            .test(
                "isPriceRequired",
                PRICE_REQUIRED_MESSAGE,
                (price, testContext) => {
                    const { priceType } = (testContext as yup.TestContextExtended).parent;

                    if (priceType === PriceType.FREE) {
                        return true;
                    }

                    return !!price && price > 0;
                }
            )
            .nullable()
    });

export const validationSchema = yup.object()
    .shape({
        [PlaceFieldsName.NAME]: yup.string()
            .trim()
            .min(AMOUNT_OF_PLACE_NAME_CHARACTERS.min, PLACE_NAME_REQUIRED_MESSAGE)
            .max(AMOUNT_OF_PLACE_NAME_CHARACTERS.max, PLACE_NAME_INVALID_MESSAGE)
            .matches(BASE_CYRILLIC_AND_LATIN_REG_EXP, PLACE_NAME_INVALID_MESSAGE)
            .required(PLACE_NAME_REQUIRED_MESSAGE),
        [PlaceFieldsName.DESCRIPTION]: yup.string()
            .trim()
            .min(AMOUNT_OF_PLACE_DESCRIPTION_CHARACTERS.min, PLACE_DESCRIPTION_REQUIRED_MESSAGE)
            .max(AMOUNT_OF_PLACE_DESCRIPTION_CHARACTERS.max, PLACE_DESCRIPTION_INVALID_MESSAGE)
            .required(PLACE_DESCRIPTION_REQUIRED_MESSAGE),
        [PlaceFieldsName.PHONE]: yup.string()
            .required(PHONE_REQUIRED_MESSAGE)
            .matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE),
        [PlaceFieldsName.SITE]: yup.string()
            .required(SITE_REQUIRED_MESSAGE)
            .matches(URL_REG_EXP, SITE_INVALID_MESSAGE),
        [PlaceFieldsName.EMAIL]: yup.string()
            .required(EMAIL_REQUIRED_MESSAGE)
            .email(EMAIL_INVALID_MESSAGE),
        [PlaceFieldsName.ADDRESS]: yup.string()
            .min(AMOUNT_OF_PLACE_ADDRESS_CHARACTERS.min, PLACE_ADDRESS_REQUIRED_MESSAGE)
            .matches(BASE_CYRILLIC_REG_EXP, PLACE_ADDRESS_INVALID_MESSAGE)
            .required(PLACE_ADDRESS_REQUIRED_MESSAGE),
        [PlaceFieldsName.MAX_CAPACITY]: yup.number()
            .min(AMOUNT_OF_MAX_CAPACITY_CHARACTERS.min, MAX_CAPACITY_INVALID_MESSAGE)
            .max(AMOUNT_OF_MAX_CAPACITY_CHARACTERS.max, MAX_CAPACITY_INVALID_MAX_MESSAGE)
            .test(
                "isMaxCapacityCorrect",
                MAX_CAPACITY_LOWER_THEN_MIN_MESSAGE,
                (maxCapacity, testContext) => {
                    const { minCapacity } = (testContext as yup.TestContextExtended).parent;

                    if (minCapacity === undefined || maxCapacity === undefined) {
                        return true;
                    }

                    return minCapacity <= maxCapacity;
                }
            )
            .nullable()
            .optional(),
        [PlaceFieldsName.MIN_CAPACITY]: yup.number()
            .min(AMOUNT_OF_MIN_CAPACITY_CHARACTERS.min, MIN_CAPACITY_INVALID_MESSAGE)
            .max(AMOUNT_OF_MIN_CAPACITY_CHARACTERS.max, MIN_CAPACITY_INVALID_MAX_MESSAGE)
            .nullable()
            .optional(),
        [PlaceFieldsName.COORDINATES]: yup.object()
            .shape({
                [PlaceCoordinatesFieldsName.LATITUDE]: yup.mixed()
                    .test(
                        "isLatitudeCorrect",
                        PLACE_LATITUDE_INVALID_MESSAGE,
                        (latitude) => {
                            if (latitude === undefined || latitude === null) {
                                return true;
                            }

                            return /^-?\d\d?(.\d{1,6})?$/.test(latitude);
                        }
                    )
                    .nullable()
                    .optional(),
                [PlaceCoordinatesFieldsName.LONGITUDE]: yup.mixed()
                    .test(
                        "islLongitudeCorrect",
                        PLACE_LONGITUDE_INVALID_MESSAGE,
                        (longitude) => {
                            if (longitude === undefined || longitude === null) {
                                return true;
                            }

                            return /^-?\d\d?(\.\d{1,6})?$/.test(longitude);
                        }
                    )
                    .nullable()
                    .optional()
            }),
        [PlaceFieldsName.FREE_SQUARE]: yup.number()
            .required(FREE_SQUARE_REQUIRE_MESSAGE)
            .min(AMOUNT_OF_FREE_SQUARE_CHARACTERS.min, FREE_SQUARE_REQUIRE_MESSAGE)
            .max(AMOUNT_OF_FREE_SQUARE_CHARACTERS.max, FREE_SQUARE_INVALID_MAX_MESSAGE)
            .test(
                "isFreeSquareCorrect",
                FREE_SQUARE_BIGGER_THEN_FULL_MESSAGE,
                (freeSquare, testContext) => {
                    const { fullSquare } = (testContext as yup.TestContextExtended).parent;

                    if (freeSquare === undefined || fullSquare === undefined) {
                        return true;
                    }

                    return freeSquare <= fullSquare;
                }
            ),
        [PlaceFieldsName.FULL_SQUARE]: yup.number()
            .required(FULL_SQUARE_REQUIRE_MESSAGE)
            .min(AMOUNT_OF_FULL_SQUARE_CHARACTERS.min, FULL_SQUARE_REQUIRE_MESSAGE)
            .max(AMOUNT_OF_FULL_SQUARE_CHARACTERS.max, FULL_SQUARE_INVALID_MAX_MESSAGE),
        [PlaceFieldsName.LEVEL_NUMBER]: yup.number()
            .min(AMOUNT_OF_LEVEL_NUMBER_CHARACTERS.min, LEVEL_NUMBER_INVALID_MESSAGE)
            .max(AMOUNT_OF_LEVEL_NUMBER_CHARACTERS.max, LEVEL_NUMBER_INVALID_MESSAGE)
            .optional()
            .nullable(),
        [PlaceFieldsName.FACILITIES]: yup.array()
            .of(
                yup.object().shape({
                    [PlaceFacilityFieldsName.NAME]: yup.string()
                        .trim()
                        .min(AMOUNT_OF_PLACE_FACILITY_NAME_CHARACTERS.min, PLACE_FACILITY_NAME_REQUIRED_MESSAGE)
                        .required(PLACE_FACILITY_NAME_REQUIRED_MESSAGE),
                    [PlaceFacilityFieldsName.COUNT]: yup.number()
                        .min(1, PLACE_FACILITY_COUNT_REQUIRED_MESSAGE)
                        .optional()
                })
            )
            .nullable()
            .optional(),
        [PlaceFieldsName.SERVICES]: yup.array()
            .of(
                yup.object().shape({
                    [PlaceServiceFieldsName.NAME]: yup.string()
                        .trim()
                        .min(AMOUNT_OF_PLACE_SERVICE_NAME_CHARACTERS.min, PLACE_SERVICE_NAME_REQUIRED_MESSAGE)
                        .required(PLACE_SERVICE_NAME_REQUIRED_MESSAGE),
                    [PlaceServiceFieldsName.PRICE]: priceValidationSchema
                })
            )
            .nullable()
            .optional(),
        [PlaceFieldsName.EQUIPMENTS]: yup.array()
            .of(
                yup.object().shape({
                    [PlaceEquipmentFieldsName.NAME]: yup.string()
                        .trim()
                        .min(AMOUNT_OF_PLACE_EQUIPMENT_NAME_CHARACTERS.min, PLACE_EQUIPMENT_NAME_REQUIRED_MESSAGE)
                        .required(PLACE_EQUIPMENT_NAME_REQUIRED_MESSAGE),
                    [PlaceEquipmentFieldsName.COUNT]: yup.number()
                        .min(1, PLACE_EQUIPMENT_COUNT_REQUIRED_MESSAGE)
                        .optional(),
                    [PlaceServiceFieldsName.PRICE]: priceValidationSchema
                })
            )
            .nullable()
            .optional(),
        [PlaceFieldsName.PLACE_IMAGES]: yup.array()
            .of(
                yup.mixed()
                    .test("fileSize", PLACE_IMAGE_MAX_SIZE_INVALID_MESSAGE, (value: string | File | undefined) => (
                        !value || typeof value === "string"
                            ? true
                            : value.size <= IMAGE_MAX_SIZE
                    ))
            )
            .max(AMOUNT_OF_PLACE_IMAGES_CHARACTERS.max, PLACE_IMAGES_INVALID_COUNT_MESSAGE)
            .nullable()
            .optional()
    });
