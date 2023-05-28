import React from "react";

import ArrayFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ArrayFormSegment";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import { PlaceFieldsName } from "@models/places/enums";

export const ImageFields: (index: number) => FormFieldProps[] = (index) => [{
    name: `${PlaceFieldsName.PLACE_IMAGES}.${index}`,
    type: FormFieldType.IMAGE_SELECTOR,
    placeholder: "Выберите изображения для галереи в формате .jpg, .jpeg или .png (максимум 10 МБ)"
}];

export default function ImagesFormSegment() {
    return (
        <ArrayFormSegment
            title="Галерея"
            arrayFieldName={PlaceFieldsName.PLACE_IMAGES}
            fields={ImageFields}
            addButtonTitle="Добавить изображение"
            initialAddValue={undefined}
        />
    );
}
