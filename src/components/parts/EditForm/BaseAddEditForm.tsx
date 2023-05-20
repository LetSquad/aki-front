import { lazy } from "react";

import classNames from "classnames";
import { FormikContextType } from "formik";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldProps } from "@models/forms/types";
import AddEditForm from "@parts/EditForm/AddEditForm";
import styles from "@parts/EditForm/styles/BaseAddEditForm.module.scss";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField/FormField"));

export interface BaseFormProps<Values> {
    fields: FormFieldProps[];
    formik: FormikContextType<Values>;
    isLoading: boolean;
    submitButtonText?: string;
    onCancel?: () => void;
    cancelButtonText?: string;
    className?: string;
}

export default function BaseAddEditForm<Values>({
    fields,
    formik,
    isLoading,
    submitButtonText,
    onCancel,
    cancelButtonText,
    className
}: BaseFormProps<Values>) {
    return (
        <AddEditForm
            formik={formik}
            isLoading={isLoading}
            submitButtonText={submitButtonText}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            className={className}
        >
            <div className={styles.fields}>
                {fields.map(({ className: fieldClassName, ...input }) => (
                    <WithSuspense
                        key={input.name}
                        loader={<FormFieldPlaceholder />}
                    >
                        <FormField
                            {...input}
                            className={classNames(fieldClassName, styles.field)}
                        />
                    </WithSuspense>
                ))}
            </div>
        </AddEditForm>
    );
}

export type BaseAddEditFormType = typeof BaseAddEditForm;
