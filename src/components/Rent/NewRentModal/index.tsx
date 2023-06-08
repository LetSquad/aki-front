import {
    FormEvent,
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import * as React from "react";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import {
    Checkbox,
    Dropdown,
    Form,
    Loader,
    Modal
} from "semantic-ui-react";
import { CheckboxProps } from "semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox";
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
import { createRentRequest, generateAgreementRequest, setCurrentRentPlace } from "@store/rent/reducer";
import {
    selectAgreement,
    selectCurrentRentPlace,
    selectIsAgreementLoading,
    selectIsAgreementLoadingFailed,
    selectIsNewRentAdding
} from "@store/rent/selectors";

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

    const linkRef = useRef<HTMLAnchorElement>(null);

    const isNewRentAdding = useAppSelector(selectIsNewRentAdding);
    const agreementLink = useAppSelector(selectAgreement);
    const isAgreementLoading = useAppSelector(selectIsAgreementLoading);
    const isAgreementLoadingFailed = useAppSelector(selectIsAgreementLoadingFailed);

    const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);

    const onAgreementAcceptChanged = useCallback((event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        if (event.target !== linkRef.current) {
            setIsAgreementAccepted(data.checked === undefined ? false : data.checked);
        }
    }, []);

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

    const getAgreement = useCallback(() => {
        dispatch(generateAgreementRequest({ placeId: currentPlace.id }));
    }, [currentPlace.id, dispatch]);

    const rentSlots = useCallback((values: NewRentByDaysFormValues | NewRentByHoursFormValues) => {
        if (
            NewRentFieldName.DATE_TIME_START in values &&
            values[NewRentFieldName.DATE_TIME_START] &&
            values[NewRentFieldName.DATE_TIME_END]
        ) {
            return byDayRentSlots
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
                });
        }

        if (
            NewRentFieldName.DATE in values &&
            values[NewRentFieldName.DATE] &&
            values[NewRentFieldName.TIME_START] &&
            values[NewRentFieldName.TIME_END]
        ) {
            return byHoursRentSlots
                .filter((rentSlot) => {
                    const startTime = DateTime.fromISO(rentSlot.timeStart).set({ millisecond: 0 });
                    const endTime = DateTime.fromISO(rentSlot.timeEnd).set({ millisecond: 0 });
                    const start = DateTime.fromISO(`${values[NewRentFieldName.DATE]}T${values[NewRentFieldName.TIME_START]}`).set({ millisecond: 0 });
                    const end = DateTime.fromISO(`${values[NewRentFieldName.DATE]}T${values[NewRentFieldName.TIME_END]}`).set({ millisecond: 0 });
                    return (
                        start <= startTime &&
                        end >= endTime
                    );
                });
        }

        return [];
    }, [byDayRentSlots, byHoursRentSlots]);

    const rentSlotsPrice = useCallback((values: NewRentByDaysFormValues | NewRentByHoursFormValues) => {
        let price = 0;
        for (const rentSlot of rentSlots(values)) {
            price += rentSlot.price;
        }

        return price;
    }, [rentSlots]);

    const addRentByDaysSlots = useCallback((values: NewRentByDaysFormValues) => {
        const rentSlotIds = rentSlots(values).map((rentSlot) => rentSlot.id);

        dispatch(createRentRequest({
            rentSlotIds,
            placeId: currentPlace.id,
            placeName: currentPlace.name,
            agreement: agreementLink as string
        }))
            .then((response) => {
                if (response.type === createRentRequest.fulfilled.type) {
                    onClose();
                }
            });
    }, [agreementLink, currentPlace.id, currentPlace.name, dispatch, onClose, rentSlots]);

    const addRentByHoursSlots = useCallback((values: NewRentByHoursFormValues) => {
        const rentSlotIds = rentSlots(values).map((rentSlot) => rentSlot.id);

        dispatch(createRentRequest({
            rentSlotIds,
            placeId: currentPlace.id,
            placeName: currentPlace.name,
            agreement: agreementLink as string
        }))
            .then((response) => {
                if (response.type === createRentRequest.fulfilled.type) {
                    onClose();
                }
            });
    }, [agreementLink, currentPlace.id, currentPlace.name, dispatch, onClose, rentSlots]);

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

    const isByDaysSubmitDisabled = useMemo(() => (
        Object.keys(byDaysFormik.errors).length > 0 ||
            isNewRentAdding ||
            byDayRentSlots.length === 0 ||
            !isAgreementAccepted
    ), [byDayRentSlots.length, byDaysFormik.errors, isAgreementAccepted, isNewRentAdding]);

    const isByHoursSubmitDisabled = useMemo(() => (
        Object.keys(byHoursFormik.errors).length > 0 ||
            isNewRentAdding ||
            byHoursRentSlots.length === 0 ||
            !isAgreementAccepted
    ), [byHoursFormik.errors, byHoursRentSlots.length, isAgreementAccepted, isNewRentAdding]);

    useEffect(() => {
        getAgreement();
    }, [getAgreement]);

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
                    <span className={styles.price}>
                        {`Стоимость аренды площадки на заданное время ~ ${rentSlotsPrice(duration === RentSlotDuration.DAY ? byDaysFormik.values : byHoursFormik.values)} ₽`}
                    </span>
                    <div className={styles.agreementContainer}>
                        <Checkbox
                            onChange={onAgreementAcceptChanged}
                            checked={isAgreementAccepted}
                            disabled={isAgreementLoading || isAgreementLoadingFailed}
                            label={(
                                <label>
                                    {"Подтвердите, что вы согласны с условиями "}
                                    <a
                                        target="_blank"
                                        href={agreementLink}
                                        rel="noreferrer"
                                        ref={linkRef}
                                        type="application/pdf"
                                    >
                                        договора оферты
                                    </a>
                                </label>
                            )}
                        />
                        {isAgreementLoading && <Loader inline />}
                    </div>
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
