import { useCallback, useMemo } from "react";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import { Form, Modal } from "semantic-ui-react";

import modalStyles from "@coreStyles/modals.module.scss";
import { Place } from "@models/places/types";
import { NewRentSlotsDatePeriodsFieldName, NewRentSlotsFieldName, RentSlotDuration } from "@models/rentSlots/enums";
import { NewRentSlotFormValues, OptionalNewRentSlotFormValues } from "@models/rentSlots/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createRentSlotsRequest } from "@store/rentSlot/reducer";
import { selectIsNewRentSlotsAdding } from "@store/rentSlot/selectors";
import { selectCurrentUser } from "@store/user/selectors";

import { validationSchema } from "./newRentSlotsValidation";
import PeriodsFields from "./PeriodsFields";
import styles from "./styles/NewRentSlotModal.module.scss";

interface NewRentSlotModalViewProps {
    currentPlace: Place;
    date?: DateTime;
    onClose: () => void;
}

const initialValues: (date: DateTime) => OptionalNewRentSlotFormValues =
    (date) => {
        const isoDate = date.toISODate() as string;

        return {
            [NewRentSlotsFieldName.TIME_START]: "06:00:00.000Z",
            [NewRentSlotsFieldName.TIME_END]: "20:00:00.000Z",
            [NewRentSlotsFieldName.AROUND_THE_CLOCK]: false,
            [NewRentSlotsFieldName.PRICE]: undefined,
            [NewRentSlotsFieldName.DURATION]: RentSlotDuration.DAY,
            [NewRentSlotsFieldName.DATE_PERIOD]: [{
                [NewRentSlotsDatePeriodsFieldName.DATE_START]: isoDate,
                [NewRentSlotsDatePeriodsFieldName.DATE_END]: isoDate
            }]
        };
    };

function NewRentSlotModalView({ currentPlace, date, onClose }: Required<NewRentSlotModalViewProps>) {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(selectCurrentUser);
    const isNewRentSlotsAdding = useAppSelector(selectIsNewRentSlotsAdding);

    const addRentSlots = useCallback((values: OptionalNewRentSlotFormValues) => {
        dispatch(createRentSlotsRequest({
            ...values as NewRentSlotFormValues,
            placeId: currentPlace.id,
            placeName: currentPlace.name
        }))
            .then((response) => {
                if (response.type === createRentSlotsRequest.fulfilled.type) {
                    onClose();
                }
            });
    }, [currentPlace.id, currentPlace.name, dispatch, onClose]);

    const formik = useFormik<OptionalNewRentSlotFormValues>({
        onSubmit: addRentSlots,
        initialValues: initialValues(date),
        validationSchema,
        initialTouched: {
            [NewRentSlotsFieldName.DATE_PERIOD]: true
        },
        validateOnBlur: false
    });

    const isSubmitDisabled = useMemo(
        () => Object.keys(formik.errors).length > 0 || isNewRentSlotsAdding || !currentUser,
        [currentUser, formik.errors, isNewRentSlotsAdding]
    );

    return (
        <Modal
            open
            onClose={onClose}
            closeIcon
            size="small"
        >
            <Modal.Header>
                Создание новых слотов аренды
            </Modal.Header>
            <Modal.Content className={modalStyles.modalContent}>
                <FormikProvider value={formik}>
                    <Form
                        onSubmit={formik.handleSubmit}
                        className={styles.form}
                    >
                        <PeriodsFields />
                    </Form>
                </FormikProvider>
            </Modal.Content>
            <Modal.Actions className={modalStyles.modalActions}>
                <PrimaryButton
                    onClick={formik.submitForm}
                    disabled={isSubmitDisabled}
                    loading={isNewRentSlotsAdding}
                >
                    Создать слоты
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}

export default function NewRentSlotModal({ currentPlace, date, onClose }: NewRentSlotModalViewProps) {
    return date
        ? (
            <NewRentSlotModalView
                currentPlace={currentPlace}
                date={date}
                onClose={onClose}
            />
        )
        : null;
}
