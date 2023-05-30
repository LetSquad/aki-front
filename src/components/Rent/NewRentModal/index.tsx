import {
    SyntheticEvent,
    useCallback,
    useMemo,
    useState
} from "react";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import { Dropdown, Form, Modal } from "semantic-ui-react";
import { DropdownProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

import RentByHoursForm from "@components/Rent/NewRentModal/RentByHoursForm";
import { byDaysValidationSchema, byHoursValidationSchema } from "@components/Rent/NewRentModal/validations";
import modalStyles from "@coreStyles/modals.module.scss";
import { getRentSlotDurationTitleFromEnum } from "@coreUtils/utils";
import { DropdownOption } from "@models/forms/types";
import { Place } from "@models/places/types";
import { NewRentFieldName } from "@models/rent/enums";
import { NewRentByDaysFormValues, NewRentByHoursFormValues } from "@models/rent/types";
import { RentSlotDuration, RentSlotStatus } from "@models/rentSlots/enums";
import { RentSlot } from "@models/rentSlots/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createRentRequest, setCurrentRentPlace } from "@store/rent/reducer";
import { selectCurrentRentPlace, selectIsNewRentAdding } from "@store/rent/selectors";

import RentByDaysForm from "./RentByDaysForm";
import styles from "./styles/NewRentModal.module.scss";

const byDaysInitialValues: NewRentByDaysFormValues = {
    [NewRentFieldName.DATE_TIME_START]: undefined,
    [NewRentFieldName.DATE_TIME_END]: undefined
};

const byHoursInitialValues: NewRentByHoursFormValues = {
    [NewRentFieldName.DATE]: undefined,
    [NewRentFieldName.TIME_START]: undefined,
    [NewRentFieldName.TIME_END]: undefined
};

const RentSlotDurationOptions: DropdownOption[] = Object.values(RentSlotDuration).map((duration) => ({
    value: duration,
    text: getRentSlotDurationTitleFromEnum(duration)
}));

interface NewRentModalViewProps {
    currentPlace: Place;
}

function NewRentModalView({ currentPlace }: NewRentModalViewProps) {
    const dispatch = useAppDispatch();

    const isNewRentAdding = useAppSelector(selectIsNewRentAdding);

    const onClose = useCallback(() => {
        dispatch(setCurrentRentPlace(undefined));
    }, [dispatch]);

    const eligibleRentSlots = useMemo(() => (
        currentPlace.rentSlots?.filter((rentSlot) => (
            DateTime.fromISO(rentSlot.timeStart) > DateTime.now() && rentSlot.status === RentSlotStatus.OPEN)) || []
    ), [currentPlace.rentSlots]);

    const byDayRentSlots = useMemo<RentSlot[]>(() => (
        eligibleRentSlots.filter((rentSlot) => (
            Math.abs(DateTime.fromISO(rentSlot.timeEnd).diff(DateTime.fromISO(rentSlot.timeStart), "hours").hours) > 1
        ))
    ), [eligibleRentSlots]);

    const byHoursRentSlots = useMemo<RentSlot[]>(() => (
        eligibleRentSlots.filter((rentSlot) => (
            Math.abs(DateTime.fromISO(rentSlot.timeEnd).diff(DateTime.fromISO(rentSlot.timeStart), "hours").hours) === 1
        ))
    ), [eligibleRentSlots]);

    const isHaveDaysSlots = byDayRentSlots.length > 0;
    const isHaveHoursSlots = byHoursRentSlots.length > 0;

    const [duration, setDuration] = useState(
        isHaveDaysSlots || (isHaveDaysSlots && isHaveHoursSlots)
            ? RentSlotDuration.DAY
            : RentSlotDuration.HOUR
    );

    const onDurationChange = useCallback((event: SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setDuration(data.value as RentSlotDuration);
    }, []);

    const addRentByDaysSlots = useCallback((values: NewRentByDaysFormValues) => {
        const rentSlotIds = byDayRentSlots
            .filter((rentSlot) => {
                const startDateTime = DateTime.fromISO(rentSlot.timeStart).set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                });
                return (
                    DateTime.fromISO(values[NewRentFieldName.DATE_TIME_START] as string).set({ millisecond: 0 }) <=
                        startDateTime.set({ millisecond: 0 }) &&
                    DateTime.fromISO(values[NewRentFieldName.DATE_TIME_END] as string).set({ millisecond: 0 }) >=
                        startDateTime.set({ millisecond: 0 })
                );
            })
            .map((rentSlot) => rentSlot.id);

        dispatch(createRentRequest({
            rentSlotIds,
            placeId: currentPlace.id,
            placeName: currentPlace.name
        }))
            .then((response) => {
                if (response.type === createRentRequest.fulfilled.type) {
                    onClose();
                }
            });
    }, [byDayRentSlots, currentPlace.id, currentPlace.name, dispatch, onClose]);

    const addRentByHoursSlots = useCallback((values: NewRentByHoursFormValues) => {
        const rentSlotIds = byHoursRentSlots
            .filter((rentSlot) => {
                const startTime = DateTime.fromISO(rentSlot.timeStart).set({ millisecond: 0 });
                const endTime = DateTime.fromISO(rentSlot.timeEnd).set({ millisecond: 0 });
                const start = DateTime.fromISO(`${values[NewRentFieldName.DATE]}T${values[NewRentFieldName.TIME_START]}`).set({ millisecond: 0 });
                const end = DateTime.fromISO(`${values[NewRentFieldName.DATE]}T${values[NewRentFieldName.TIME_END]}`).set({ millisecond: 0 });
                return (
                    start <= startTime &&
                    end >= endTime
                );
            })
            .map((rentSlot) => rentSlot.id);

        dispatch(createRentRequest({
            rentSlotIds,
            placeId: currentPlace.id,
            placeName: currentPlace.name
        }))
            .then((response) => {
                if (response.type === createRentRequest.fulfilled.type) {
                    onClose();
                }
            });
    }, [byHoursRentSlots, currentPlace.id, currentPlace.name, dispatch, onClose]);

    const byDaysFormik = useFormik<NewRentByDaysFormValues>({
        onSubmit: addRentByDaysSlots,
        initialValues: byDaysInitialValues,
        validationSchema: byDaysValidationSchema,
        validateOnBlur: false
    });

    const byHoursFormik = useFormik<NewRentByHoursFormValues>({
        onSubmit: addRentByHoursSlots,
        initialValues: byHoursInitialValues,
        validationSchema: byHoursValidationSchema,
        validateOnBlur: false
    });

    const isByDaysSubmitDisabled = useMemo(
        () => Object.keys(byDaysFormik.errors).length > 0 || isNewRentAdding || byDayRentSlots.length === 0,
        [byDayRentSlots.length, byDaysFormik.errors, isNewRentAdding]
    );

    const isByHoursSubmitDisabled = useMemo(
        () => Object.keys(byHoursFormik.errors).length > 0 || isNewRentAdding || byHoursRentSlots.length === 0,
        [byHoursFormik.errors, byHoursRentSlots.length, isNewRentAdding]
    );

    return (
        <Modal
            open
            onClose={onClose}
            closeIcon
            size="small"
        >
            <Modal.Header>
                Забронировать площадку
            </Modal.Header>
            <Modal.Content className={modalStyles.modalContent}>
                <div className={styles.contentContainer}>
                    <div className={styles.dropdownContainer}>
                        <Dropdown
                            options={RentSlotDurationOptions}
                            value={duration}
                            onChange={onDurationChange}
                            selection
                            fluid
                        />
                    </div>
                    {
                        duration === RentSlotDuration.DAY
                            ? (
                                <FormikProvider value={byDaysFormik}>
                                    <Form
                                        onSubmit={byDaysFormik.handleSubmit}
                                    >
                                        {
                                            isHaveDaysSlots
                                                ? <RentByDaysForm rentSlots={byDayRentSlots} />
                                                : "К сожалению сейчас нет доступных слотов для аренды по дням. Попробуйте позже"
                                        }
                                    </Form>
                                </FormikProvider>
                            )
                            : (
                                <FormikProvider value={byHoursFormik}>
                                    <Form
                                        onSubmit={byHoursFormik.handleSubmit}
                                    >
                                        {
                                            isHaveHoursSlots
                                                ? <RentByHoursForm rentSlots={byHoursRentSlots} />
                                                : "К сожалению сейчас нет доступных слотов для почасовой аренды. Попробуйте позже"
                                        }
                                    </Form>
                                </FormikProvider>
                            )
                    }
                </div>
            </Modal.Content>
            <Modal.Actions className={modalStyles.modalActions}>
                <PrimaryButton
                    onClick={duration === RentSlotDuration.DAY ? byDaysFormik.submitForm : byHoursFormik.submitForm}
                    disabled={duration === RentSlotDuration.DAY ? isByDaysSubmitDisabled : isByHoursSubmitDisabled}
                    loading={isNewRentAdding}

                >
                    Забронировать
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}

export default function NewRentModal() {
    const currentPlace = useAppSelector(selectCurrentRentPlace);

    return currentPlace ? <NewRentModalView currentPlace={currentPlace} /> : null;
}
