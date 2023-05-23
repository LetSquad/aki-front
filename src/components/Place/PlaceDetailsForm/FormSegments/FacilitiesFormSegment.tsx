import React from "react";

import ArrayFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ArrayFormSegment";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import { PlaceFacilityFieldsName, PlaceFieldsName } from "@models/places/enums";

export const FacilityFields: (index: number) => FormFieldProps[] = (index) => [
    {
        name: `${PlaceFieldsName.FACILITIES}.${index}.${PlaceFacilityFieldsName.NAME}`,
        label: "Название удобства",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите название удобства"
    }, {
        name: `${PlaceFieldsName.FACILITIES}.${index}.${PlaceFacilityFieldsName.COUNT}`,
        label: "Количество удобств",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 1,
        step: 1,
        placeholder: "5"
    }
];

export default function FacilitiesFormSegment() {
    return (
        <ArrayFormSegment
            title="Удобства"
            arrayFieldName={PlaceFieldsName.FACILITIES}
            fields={FacilityFields}
            addButtonTitle="Добавить удобство"
            initialAddValue={{
                [PlaceFacilityFieldsName.NAME]: "",
                [PlaceFacilityFieldsName.COUNT]: undefined
            }}
            numberOfFields={2}
        />
    );
}
