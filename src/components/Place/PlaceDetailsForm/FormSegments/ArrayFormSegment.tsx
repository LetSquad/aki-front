import React from "react";

import { useFormikContext } from "formik";
import { Segment } from "semantic-ui-react";

import basePlaceStyles from "@components/Place/PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import { PlaceAddFormValues } from "@models/places/types";
import ArrayFormFields, { ArrayFormFieldsProps } from "@parts/EditForm/ArrayFormFields";

interface ArrayFormSegmentProps<T> extends Omit<ArrayFormFieldsProps<T, PlaceAddFormValues>, "values"> {
    title: string;
}

export default function ArrayFormSegment<T>({
    title,
    ...props
}: ArrayFormSegmentProps<T>) {
    const { values } = useFormikContext<PlaceAddFormValues>();

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>{title}</span>
            <ArrayFormFields
                values={values}
                {...props}
            />
        </Segment>
    );
}
