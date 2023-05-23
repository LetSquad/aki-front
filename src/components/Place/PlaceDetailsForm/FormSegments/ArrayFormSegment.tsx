import React, { ReactNode } from "react";

import classNames from "classnames";
import { FieldArray, useFormikContext } from "formik";
import { Icon, Segment } from "semantic-ui-react";

import basePlaceStyles from "@components/Place/PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldProps } from "@models/forms/types";
import { PlaceAddFormValues } from "@models/places/types";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import baseFormFieldsStyles from "@parts/EditForm/styles/BaseFormFields.module.scss";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/ArrayFormSegment.module.scss";

interface ArrayFormSegmentProps<T> {
    children?: (index: number) => ReactNode
    title: string;
    arrayFieldName: keyof PlaceAddFormValues;
    fields: (index: number) => FormFieldProps[];
    addButtonTitle: string;
    initialAddValue: T,
    numberOfFields?: 2 | 3 | 4;
}

export default function ArrayFormSegment<T>({
    title,
    arrayFieldName,
    fields,
    addButtonTitle,
    initialAddValue,
    children,
    numberOfFields
}: ArrayFormSegmentProps<T>) {
    const { values } = useFormikContext<PlaceAddFormValues>();

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>{title}</span>
            <FieldArray name={arrayFieldName}>
                {({ remove, push }) => (
                    <div className={styles.fieldsArrayContainer}>
                        {(values[arrayFieldName] as T[])?.map(
                            (field, index) => (
                                <div
                                    /* eslint-disable-next-line react/no-array-index-key */
                                    key={index}
                                    className={styles.rowContainer}
                                >
                                    <div
                                        className={
                                            classNames(styles.rowFieldsContainer, {
                                                [styles.rowFieldsContainerTwo]: numberOfFields === 2,
                                                [styles.rowFieldsContainerThree]: numberOfFields === 3,
                                                [styles.rowFieldsContainerFour]: numberOfFields === 4
                                            })
                                        }
                                    >
                                        {fields(index).map((input) => (
                                            <WithSuspense
                                                key={input.name}
                                                loader={<FormFieldPlaceholder />}
                                            >
                                                <FormField
                                                    {...input}
                                                    className={baseFormFieldsStyles.field}
                                                />
                                            </WithSuspense>
                                        ))}
                                        {children && children(index)}
                                    </div>
                                    <Icon
                                        name="remove"
                                        link
                                        onClick={() => remove(index)}
                                    />
                                </div>
                            )
                        )}
                        <SecondaryButton
                            type="button"
                            className={styles.newFieldButton}
                            onClick={() => push(initialAddValue)}
                        >
                            {addButtonTitle}
                        </SecondaryButton>
                    </div>
                )}
            </FieldArray>
        </Segment>
    );
}
