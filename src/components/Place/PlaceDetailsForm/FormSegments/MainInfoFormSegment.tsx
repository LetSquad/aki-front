import { Segment } from "semantic-ui-react";

import PriceFormFields from "@components/Place/PlaceDetailsForm/FormSegments/PriceFormFields";
import basePlaceStyles from "@components/Place/PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import { getSpecializationTitleFromEnum } from "@components/Place/utils/utils";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PlaceFieldsName, Specialization } from "@models/places/enums";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

const PlaceSpecializationsOptions: DropdownOption[] = Object.values(Specialization).map((specialization) => ({
    value: specialization,
    text: getSpecializationTitleFromEnum(specialization)
}));

export const MainInfoFields: FormFieldProps[] = [
    {
        name: PlaceFieldsName.NAME,
        label: "Название площадки",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите название площадки"
    }, {
        name: PlaceFieldsName.DESCRIPTION,
        label: "Описание площадки",
        required: true,
        type: FormFieldType.TEXTAREA,
        placeholder: "Введите описание площадки"
    }, {
        name: PlaceFieldsName.SPECIALIZATION,
        options: PlaceSpecializationsOptions,
        label: "Специализация",
        required: true,
        type: FormFieldType.DROPDOWN,
        placeholder: "Выберите специализацию площадки из списка"
    }, {
        name: PlaceFieldsName.ADDRESS,
        label: "Адрес площадки",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "ул. Площадковая, д. 1"
    }, {
        name: PlaceFieldsName.SITE,
        label: "Сайт площадки",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "https://site.ru"
    }, {
        name: PlaceFieldsName.EMAIL,
        label: "Email площадки",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "place@site.ru"
    }, {
        name: PlaceFieldsName.PHONE,
        label: "Телефон площадки",
        required: true,
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "+7 123 456-78-90"
    }, {
        name: PlaceFieldsName.FULL_SQUARE,
        label: "Полная площадь",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        step: 1,
        labelPosition: "right",
        inputLabel: "м²",
        placeholder: "123"
    }, {
        name: PlaceFieldsName.FREE_SQUARE,
        label: "Свободная арендопригодная площадь",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        step: 1,
        labelPosition: "right",
        inputLabel: "м²",
        placeholder: "92"
    }, {
        name: PlaceFieldsName.MIN_CAPACITY,
        label: "Минимальная вместимость",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        step: 1,
        labelPosition: "right",
        inputLabel: "чел.",
        placeholder: "15"
    }, {
        name: PlaceFieldsName.MAX_CAPACITY,
        label: "Максимальная вместимость",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        step: 1,
        labelPosition: "right",
        inputLabel: "чел.",
        placeholder: "80"
    }, {
        name: PlaceFieldsName.LEVEL_NUMBER,
        label: "Этаж размещения",
        type: FormFieldType.INPUT,
        inputType: "number",
        step: 1,
        labelPosition: "right",
        inputLabel: "этаж",
        placeholder: "3"
    }, {
        name: PlaceFieldsName.PARKING,
        label: "Наличие парковки",
        type: FormFieldType.CHECKBOX
    }
];

export default function MainInfoFormSegment() {
    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>Основная информация</span>
            <BaseFormFields fields={MainInfoFields}>
                <PriceFormFields groupName={PlaceFieldsName.PRICE} />
            </BaseFormFields>
        </Segment>
    );
}
