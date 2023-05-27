import { getUserSpecializationTitleFromEnum } from "@components/Profile/utils/utils";
import { FormFieldType, ImageEditorPreviewType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import {
    BaseUserFieldsName,
    LandlordBaseUserFieldsName,
    RenterBaseUserFieldsName,
    UserSpecialization
} from "@models/users/enums";
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
        name: BaseUserFieldsName.MIDDLE_NAME,
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
        placeholder: "Введите ИНН",
        maxLength: 12
    }, {
        name: LandlordBaseUserFieldsName.ORGANIZATION,
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

const UserSpecializationsOptions: DropdownOption[] = Object.values(UserSpecialization).map((specialization) => ({
    value: specialization,
    text: getUserSpecializationTitleFromEnum(specialization)
}));

export const RenterFields: FormFieldProps[] = [
    {
        name: RenterBaseUserFieldsName.SPECIALIZATIONS,
        options: UserSpecializationsOptions,
        label: "Род занятий",
        type: FormFieldType.DROPDOWN,
        multiple: true,
        placeholder: "Выберите ваш род занятий"
    }
];
