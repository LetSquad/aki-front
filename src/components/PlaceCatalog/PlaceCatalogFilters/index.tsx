import React from "react";

import classNames from "classnames";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import { getSpecializationTitleFromEnum } from "@components/Place/utils/utils";
import { validationSchema } from "@components/PlaceCatalog/PlaceCatalogFilters/validation";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PlaceFieldsName, PlacesFiltersFieldsName, Specialization } from "@models/places/enums";
import { PlacesFiltersFormValues } from "@models/places/types";
import BaseAddEditForm from "@parts/EditForm/BaseAddEditForm";

import styles from "./styles/PlaceCatalogFilters.module.scss";

export const initialValues: PlacesFiltersFormValues = {
    [PlacesFiltersFieldsName.SPECIALIZATION]: undefined,
    [PlacesFiltersFieldsName.PRICE_MIN]: undefined,
    [PlacesFiltersFieldsName.PRICE_MAX]: undefined,
    [PlacesFiltersFieldsName.CAPACITY_MIN]: undefined,
    [PlacesFiltersFieldsName.CAPACITY_MAX]: undefined,
    [PlacesFiltersFieldsName.SQUARE_MIN]: undefined,
    [PlacesFiltersFieldsName.SQUARE_MAX]: undefined,
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MIN]: undefined,
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MAX]: undefined,
    [PlacesFiltersFieldsName.WITH_PARKING]: false,
    [PlacesFiltersFieldsName.DATE_FROM]: undefined,
    [PlacesFiltersFieldsName.DATE_TO]: undefined
};

const PlaceSpecializationsOptions: DropdownOption[] = Object.values(Specialization).map((specialization) => ({
    value: specialization,
    text: getSpecializationTitleFromEnum(specialization)
}));

const fields: (fromDate?: string) => FormFieldProps[] = (fromDate) => [
    {
        name: PlacesFiltersFieldsName.SPECIALIZATION,
        options: PlaceSpecializationsOptions,
        label: "Специализация",
        type: FormFieldType.DROPDOWN,
        placeholder: "Выберите специализацию площадки из списка"
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
            name: PlacesFiltersFieldsName.CAPACITY_MIN,
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
        name: PlaceFieldsName.PARKING,
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
            minDate: DateTime.now().toJSDate()
        },
        to: {
            name: PlacesFiltersFieldsName.DATE_TO,
            type: FormFieldType.DATEPICKER,
            placeholder: "По",
            minDate: fromDate ? DateTime.fromISO(fromDate).toJSDate() : DateTime.now().toJSDate()
        }
    }
];

interface PlaceCatalogFiltersProps {
    onSubmit: (values: PlacesFiltersFormValues) => void;
    isLoading: boolean;
}

export default function PlaceCatalogFilters({ onSubmit, isLoading }: PlaceCatalogFiltersProps) {
    const withSidebar = useMediaQuery({ maxWidth: 1250 });

    const formik = useFormik<PlacesFiltersFormValues>({
        onSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    return (
        <Segment className={classNames(styles.segment, { [styles.segmentSidebar]: withSidebar })}>
            <BaseAddEditForm
                fields={fields(formik.values[PlacesFiltersFieldsName.DATE_FROM])}
                isLoading={isLoading}
                formik={formik}
            />
        </Segment>
    );
}
