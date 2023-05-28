import * as yup from "yup";

import { AVATAR_IMAGE_MAX_SIZE, PHONE_REG_EXP } from "@coreUtils/constants";
import { LandlordRegistrationFieldName } from "@models/auth/enums";
import { BaseUserFieldsName } from "@models/users/enums";

const EMAIL_INVALID_MESSAGE = "Введите корректный адрес электронной почты";
const EMAIL_REQUIRED_MESSAGE = "Необходимо ввести адрес электронной почты";

const AMOUNT_OF_NAME_CHARACTERS = {
    min: 1,
    max: 20
};
const NAME_INVALID_MESSAGE = "Имя должно состоять не более чем из 20 символов и содержать буквы или символ -";
const NAME_REQUIRED_MESSAGE = "Необходимо ввести имя";

const AMOUNT_OF_LAST_NAME_CHARACTERS = {
    min: 1,
    max: 40
};
const LAST_NAME_INVALID_MESSAGE = "Фамилия должно состоять не более чем из 40 символов и содержать буквы или символ -";
const LAST_NAME_REQUIRED_MESSAGE = "Необходимо ввести фамилию";

const AMOUNT_OF_SURNAME_CHARACTERS = {
    min: 1,
    max: 40
};
const SURNAME_INVALID_MESSAGE = "Отчество должно состоять не более чем из 40 символов и содержать буквы или символ -";

const PHONE_INVALID_MESSAGE = "Введите корректный номер телефона";
const PHONE_REQUIRED_MESSAGE = "Необходимо ввести номер телефона";

const INN_INVALID_MESSAGE = "Введите корректный ИНН (12 цифр)";
const INN_REQUIRED_MESSAGE = "Необходимо ввести ИНН";

const AMOUNT_OF_ORGANIZATION_CHARACTERS = {
    min: 1
};
const ORGANIZATION_REQUIRED_MESSAGE = "Необходимо ввести название юр. лица";

const AMOUNT_OF_JOB_TITLE_CHARACTERS = {
    min: 1,
    max: 50
};
const JOB_TITLE_INVALID_MESSAGE = "Должность должна состоять не более чем из 50 символов";
const JOB_TITLE_REQUIRED_MESSAGE = "Необходимо ввести должность";

const USER_IMAGE_MAX_SIZE_INVALID_MESSAGE = "Размер обрезанного аватара не должен превышать 1 МБ";

export const baseUserValidationSchema = yup.object()
    .shape({
        [BaseUserFieldsName.EMAIL]: yup.string()
            .required(EMAIL_REQUIRED_MESSAGE)
            .email(EMAIL_INVALID_MESSAGE)
    })
    .shape({
        [BaseUserFieldsName.FIRST_NAME]: yup.string()
            .trim()
            .min(AMOUNT_OF_NAME_CHARACTERS.min, NAME_INVALID_MESSAGE)
            .max(AMOUNT_OF_NAME_CHARACTERS.max, NAME_INVALID_MESSAGE)
            .matches(/^[ A-Za-zА-я-]*$/, NAME_INVALID_MESSAGE)
            .required(NAME_REQUIRED_MESSAGE)
    })
    .shape({
        [BaseUserFieldsName.LAST_NAME]: yup.string()
            .trim()
            .min(AMOUNT_OF_LAST_NAME_CHARACTERS.min, LAST_NAME_INVALID_MESSAGE)
            .max(AMOUNT_OF_LAST_NAME_CHARACTERS.max, LAST_NAME_INVALID_MESSAGE)
            .matches(/^[ A-Za-zА-я-]*$/, LAST_NAME_INVALID_MESSAGE)
            .required(LAST_NAME_REQUIRED_MESSAGE)
    })
    .shape({
        [BaseUserFieldsName.MIDDLE_NAME]: yup.string()
            .trim()
            .min(AMOUNT_OF_SURNAME_CHARACTERS.min, SURNAME_INVALID_MESSAGE)
            .max(AMOUNT_OF_NAME_CHARACTERS.max, SURNAME_INVALID_MESSAGE)
            .matches(/^[ A-Za-zА-я-]*$/, SURNAME_INVALID_MESSAGE)
            .optional()
    })
    .shape({
        [BaseUserFieldsName.PHONE]: yup.string()
            .required(PHONE_REQUIRED_MESSAGE)
            .matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE)
    });

export const userProfileValidationSchema = baseUserValidationSchema
    .shape({
        [BaseUserFieldsName.IMAGE]: yup.mixed()
            .test("fileSize", USER_IMAGE_MAX_SIZE_INVALID_MESSAGE, (value: string | File | undefined) => (
                !value || typeof value === "string"
                    ? true
                    : value.size <= AVATAR_IMAGE_MAX_SIZE
            ))
            .nullable()
            .optional()
    });

export const landlordBaseValidationSchema = baseUserValidationSchema
    .shape({
        [LandlordRegistrationFieldName.INN]: yup.string()
            .trim()
            .matches(/^\d{12}$/, INN_INVALID_MESSAGE)
            .required(INN_REQUIRED_MESSAGE)
    })
    .shape({
        [LandlordRegistrationFieldName.JOB_TITLE]: yup.string()
            .trim()
            .min(AMOUNT_OF_JOB_TITLE_CHARACTERS.min, JOB_TITLE_REQUIRED_MESSAGE)
            .max(AMOUNT_OF_JOB_TITLE_CHARACTERS.max, JOB_TITLE_INVALID_MESSAGE)
            .required(JOB_TITLE_REQUIRED_MESSAGE)
    })
    .shape({
        [LandlordRegistrationFieldName.ORGANIZATION]: yup.string()
            .trim()
            .min(AMOUNT_OF_ORGANIZATION_CHARACTERS.min, ORGANIZATION_REQUIRED_MESSAGE)
            .required(ORGANIZATION_REQUIRED_MESSAGE)
    });

export const landlordProfileValidationSchema = userProfileValidationSchema
    .shape({
        [LandlordRegistrationFieldName.INN]: yup.string()
            .trim()
            .matches(/^\d{12}$/, INN_INVALID_MESSAGE)
            .required(INN_REQUIRED_MESSAGE)
    })
    .shape({
        [LandlordRegistrationFieldName.JOB_TITLE]: yup.string()
            .trim()
            .min(AMOUNT_OF_JOB_TITLE_CHARACTERS.min, JOB_TITLE_INVALID_MESSAGE)
            .max(AMOUNT_OF_JOB_TITLE_CHARACTERS.max, JOB_TITLE_INVALID_MESSAGE)
            .required(JOB_TITLE_REQUIRED_MESSAGE)
    })
    .shape({
        [LandlordRegistrationFieldName.ORGANIZATION]: yup.string()
            .trim()
            .min(AMOUNT_OF_ORGANIZATION_CHARACTERS.min, ORGANIZATION_REQUIRED_MESSAGE)
            .required(ORGANIZATION_REQUIRED_MESSAGE)
    });
