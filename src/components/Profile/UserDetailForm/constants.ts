import { FormFieldType, ImageEditorPreviewType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import { BaseUserFieldsName, LandlordBaseUserFieldsName } from "@models/users/enums";
import nullUserAvatar from "@static/images/nullUserAvatar.png";

export const BaseFields: FormFieldProps[] = [
    {
        name: BaseUserFieldsName.IMAGE,
        label: "Аватар",
        previewType: ImageEditorPreviewType.CIRCLE,
        type: FormFieldType.IMAGE_EDITOR,
        nullAvatar: nullUserAvatar
    }, {
        name: BaseUserFieldsName.FIRST_NAME,
        label: "Имя",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите ваше имя"
    }, {
        name: BaseUserFieldsName.SURNAME,
        label: "Отчество",
        type: FormFieldType.INPUT,
        placeholder: "Введите ваше отчество"
    }, {
        name: BaseUserFieldsName.LAST_NAME,
        label: "Фамилия",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите вашу фамилию"
    }, {
        name: BaseUserFieldsName.EMAIL,
        required: true,
        label: "Электронная почта",
        type: FormFieldType.INPUT,
        placeholder: "Введите адрес электронной почты"
    }, {
        name: BaseUserFieldsName.PHONE,
        required: true,
        label: "Телефон",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите номер телефона"
    }
];

export const LandlordFields: FormFieldProps[] = [
    {
        name: LandlordBaseUserFieldsName.INN,
        label: "ИНН",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите ИНН"
    }, {
        name: LandlordBaseUserFieldsName.ENTITY_NAME,
        label: "Название юр. лица",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите название вашего юридического лица"
    }, {
        name: LandlordBaseUserFieldsName.JOB_TITLE,
        label: "Должность",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите ваше должность"
    }
];
