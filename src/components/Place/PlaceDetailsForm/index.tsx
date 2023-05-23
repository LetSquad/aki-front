import React, { forwardRef, useImperativeHandle } from "react";

import { FormikHelpers, useFormik } from "formik";

import EquipmentsFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/EquipmentsFormSegment";
import FacilitiesFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/FacilitiesFormSegment";
import ImagesFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ImagesFormSegment";
import MainInfoFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/MainInfoFormSegment";
import ServicesFormSegment from "@components/Place/PlaceDetailsForm/FormSegments/ServicesFormSegment";
import { validationSchema } from "@components/Place/PlaceDetailsForm/validation";
import placeInfoDetailsStyles from "@components/Place/PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { PlaceAddFormValues, PlaceDetailsFormRef } from "@models/places/types";
import AddEditForm from "@parts/EditForm/AddEditForm";

export interface PlaceDetailFormProps {
    onSubmit: (
        values: PlaceAddFormValues,
        formikHelpers: FormikHelpers<PlaceAddFormValues>
    ) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    initialValues: PlaceAddFormValues;
    className?: string;
}

const PlaceDetailsForm = forwardRef(({
    onSubmit,
    onCancel,
    initialValues,
    isLoading = false,
    className
}: PlaceDetailFormProps, ref: React.ForwardedRef<PlaceDetailsFormRef>) => {
    const formik = useFormik<PlaceAddFormValues>({
        onSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    useImperativeHandle(ref, () => ({
        resetForm: formik.resetForm
    }), [formik.resetForm]);

    return (
        <WithSuspense>
            <AddEditForm
                formik={formik}
                isLoading={isLoading}
                onCancel={onCancel}
                className={className}
            >
                <div className={placeInfoDetailsStyles.segmentsContainer}>
                    <MainInfoFormSegment />
                    <FacilitiesFormSegment />
                    <ServicesFormSegment />
                    <EquipmentsFormSegment />
                    <ImagesFormSegment />
                </div>
            </AddEditForm>
        </WithSuspense>
    );
});

export default PlaceDetailsForm;
