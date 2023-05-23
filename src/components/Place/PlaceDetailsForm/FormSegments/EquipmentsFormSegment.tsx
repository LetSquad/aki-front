import React from "react";

import ArrayFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ArrayFormSegment";
import PriceFormFields from "@components/Place/PlaceDetailsForm/FormSegments/PriceFormFields";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import {
    PlaceEquipmentFieldsName,
    PlaceFieldsName,
    PlacePriceFieldsName,
    PlaceServiceFieldsName,
    PriceType
} from "@models/places/enums";

export const EquipmentsFields: (index: number) => FormFieldProps[] = (index) => [
    {
        name: `${PlaceFieldsName.EQUIPMENTS}.${index}.${PlaceEquipmentFieldsName.NAME}`,
        label: "Название оборудования",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите название оборудования"
    }, {
        name: `${PlaceFieldsName.EQUIPMENTS}.${index}.${PlaceEquipmentFieldsName.COUNT}`,
        label: "Количество оборудования",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 1,
        step: 1,
        placeholder: "5"
    }
];

export default function EquipmentsFormSegment() {
    return (
        <ArrayFormSegment
            title="Оборудование"
            arrayFieldName={PlaceFieldsName.EQUIPMENTS}
            fields={EquipmentsFields}
            addButtonTitle="Добавить оборудование"
            initialAddValue={{
                [PlaceEquipmentFieldsName.NAME]: "",
                [PlaceEquipmentFieldsName.COUNT]: undefined,
                [PlaceEquipmentFieldsName.PRICE]: {
                    [PlacePriceFieldsName.PRICE_TYPE]: PriceType.FREE,
                    [PlacePriceFieldsName.PRICE]: 0
                }
            }}
            numberOfFields={4}
        >
            {(index) => <PriceFormFields groupName={`${PlaceFieldsName.EQUIPMENTS}[${index}].${PlaceServiceFieldsName.PRICE}`} />}
        </ArrayFormSegment>
    );
}
