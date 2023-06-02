import { Segment } from "semantic-ui-react";

import basePlaceStyles from "@components/Place/PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import { getPlaceSpecializationTitleFromEnum } from "@components/Place/utils/utils";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PlaceCoordinatesFieldsName, PlaceFieldsName, PlaceSpecialization } from "@models/places/enums";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

const PlaceSpecializationsOptions: DropdownOption[] = Object.values(PlaceSpecialization).map((specialization) => ({
    value: specialization,
    text: getPlaceSpecializationTitleFromEnum(specialization)
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
        multiple: true,
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
        max: 1_000_000,
        step: 1,
        required: true,
        labelPosition: "right",
        inputLabel: "м²",
        placeholder: "123"
    }, {
        name: PlaceFieldsName.FREE_SQUARE,
        label: "Свободная арендопригодная площадь",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        max: 1_000_000,
        step: 1,
        required: true,
        labelPosition: "right",
        inputLabel: "м²",
        placeholder: "92"
    }, {
        name: "capacity",
        label: "Вместимость",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlaceFieldsName.MIN_CAPACITY,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            max: 10_000,
            step: 1,
            labelPosition: "right",
            inputLabel: "чел.",
            placeholder: "От"
        },
        to: {
            name: PlaceFieldsName.MAX_CAPACITY,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            max: 10_000,
            step: 1,
            labelPosition: "right",
            inputLabel: "чел.",
            placeholder: "До"
        }
    }, {
        name: `${PlaceFieldsName.COORDINATES}.${PlaceCoordinatesFieldsName.LATITUDE}`,
        label: "Широта",
        type: FormFieldType.INPUT,
        placeholder: "55.7525391"
    }, {
        name: `${PlaceFieldsName.COORDINATES}.${PlaceCoordinatesFieldsName.LONGITUDE}`,
        label: "Долгота",
        type: FormFieldType.INPUT,
        placeholder: "37.6218525"
    }, {
        name: PlaceFieldsName.LEVEL_NUMBER,
        label: "Этаж размещения",
        type: FormFieldType.INPUT,
        inputType: "number",
        step: 1,
        min: -20,
        max: 120,
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
            <BaseFormFields fields={MainInfoFields} />
        </Segment>
    );
}
