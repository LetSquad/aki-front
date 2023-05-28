import React from "react";

import classNames from "classnames";
import { useFormikContext } from "formik";
import { DateTime } from "luxon";
import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import { getPlaceSpecializationTitleFromEnum } from "@components/Place/utils/utils";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PlacesFiltersFieldsName, PlaceSpecialization } from "@models/places/enums";
import { PlacesFiltersFormValues } from "@models/places/types";
import BaseAddEditForm from "@parts/EditForm/BaseAddEditForm";

import styles from "./styles/PlaceCatalogFilters.module.scss";

const PlaceSpecializationsOptions: DropdownOption[] = Object.values(PlaceSpecialization).map((specialization) => ({
    value: specialization,
    text: getPlaceSpecializationTitleFromEnum(specialization)
}));

const fields: (fromDate?: string) => FormFieldProps[] = (fromDate) => [
    {
        name: PlacesFiltersFieldsName.SPECIALIZATION,
        options: PlaceSpecializationsOptions,
        label: "Специализация",
        type: FormFieldType.DROPDOWN,
        multiple: true,
        placeholder: "Выберите специализации площадок из списка"
    }, {
        name: PlacesFiltersFieldsName.RATING,
        label: "Рейтинг",
        type: FormFieldType.RATING,
        clearable: true,
        size: "huge"
    }, {
        name: "price",
        label: "Стоимость (₽/день)",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlacesFiltersFieldsName.PRICE_MIN,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "От"
        },
        to: {
            name: PlacesFiltersFieldsName.PRICE_MAX,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "До"
        }
    }, {
        name: "square",
        label: "Площадь (м²)",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlacesFiltersFieldsName.SQUARE_MIN,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "От"
        },
        to: {
            name: PlacesFiltersFieldsName.SQUARE_MAX,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "До"
        }
    }, {
        name: "capacity",
        label: "Вместимость (чел.)",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlacesFiltersFieldsName.CAPACITY_MIN,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "От"
        },
        to: {
            name: PlacesFiltersFieldsName.CAPACITY_MAX,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "До"
        }
    }, {
        name: "levelNumber",
        label: "Этаж размещения",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlacesFiltersFieldsName.LEVEL_NUMBER_MIN,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "От"
        },
        to: {
            name: PlacesFiltersFieldsName.LEVEL_NUMBER_MAX,
            type: FormFieldType.INPUT,
            inputType: "number",
            min: 0,
            step: 1,
            placeholder: "До"
        }
    }, {
        name: PlacesFiltersFieldsName.WITH_PARKING,
        label: "Наличие парковки",
        type: FormFieldType.CHECKBOX
    }, {
        name: "date",
        label: "Даты аренды",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: PlacesFiltersFieldsName.DATE_FROM,
            type: FormFieldType.DATEPICKER,
            placeholder: "C",
            minDate: DateTime.now().toJSDate(),
            maxDate: DateTime.now().plus({ month: 3 }).toJSDate()
        },
        to: {
            name: PlacesFiltersFieldsName.DATE_TO,
            type: FormFieldType.DATEPICKER,
            placeholder: "По",
            minDate: fromDate ? DateTime.now().toJSDate() : DateTime.now().toJSDate(),
            maxDate: DateTime.now().plus({ month: 3 }).toJSDate()
        }
    }
];

interface PlaceCatalogFiltersProps {
    isLoading: boolean;
}

export default function PlaceCatalogFilters({ isLoading }: PlaceCatalogFiltersProps) {
    const withSidebar = useMediaQuery({ maxWidth: 1250 });

    const formik = useFormikContext<PlacesFiltersFormValues>();

    return (
        <Segment className={classNames(styles.segment, { [styles.segmentSidebar]: withSidebar })}>
            <BaseAddEditForm
                fields={fields(formik.values[PlacesFiltersFieldsName.DATE_FROM])}
                isLoading={isLoading}
                formik={formik}
                submitButtonText="Фильтр"
            />
        </Segment>
    );
}
