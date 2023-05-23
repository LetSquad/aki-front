import React from "react";

import ArrayFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ArrayFormSegment";
import PriceFormFields from "@components/Place/PlaceDetailsForm/FormSegments/PriceFormFields";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import {
    PlaceFieldsName,
    PlacePriceFieldsName,
    PlaceServiceFieldsName,
    PriceType
} from "@models/places/enums";

export const ServicesFields: (index: number) => FormFieldProps[] = (index) => [
    {
        name: `${PlaceFieldsName.SERVICES}.${index}.${PlaceServiceFieldsName.NAME}`,
        label: "Название услуги",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите название услуги"
    }
];

export default function ServicesFormSegment() {
    return (
        <ArrayFormSegment
            title="Услуги"
            arrayFieldName={PlaceFieldsName.SERVICES}
            fields={ServicesFields}
            addButtonTitle="Добавить услугу"
            initialAddValue={{
                [PlaceServiceFieldsName.NAME]: "",
                [PlaceServiceFieldsName.PRICE]: {
                    [PlacePriceFieldsName.PRICE_TYPE]: PriceType.FREE,
                    [PlacePriceFieldsName.PRICE]: 0
                }
            }}
            numberOfFields={3}
        >
            {(index) => <PriceFormFields groupName={`${PlaceFieldsName.SERVICES}[${index}].${PlaceServiceFieldsName.PRICE}`} />}
        </ArrayFormSegment>
    );
}
