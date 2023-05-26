import React, { useCallback, useMemo } from "react";

import { DateTime } from "luxon";
import { useMediaQuery } from "react-responsive";
import { Modal } from "semantic-ui-react";
import { SemanticWIDTHSNUMBER } from "semantic-ui-react/src/generic";

import { Place } from "@models/places/types";
import { RentSlot } from "@models/rentSlots/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import CardGrid from "@parts/CardParts/CardGrid";
import CardRow from "@parts/CardParts/CardRow";
import { CalendarEvent } from "@parts/EventCalendar/types/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cancelRentSlotRequest } from "@store/rentSlot/reducer";
import { selectIsAppointmentSlotCancelling } from "@store/rentSlot/selectors";

import modalStyles from "../styles/CalendarModal.module.scss";

interface RentSlotEventModalViewProps {
    currentPlace: Place;
    event?: CalendarEvent<RentSlot>;
    onClose: () => void;
}

const DESKTOP_COLUMN_WIDTH: [SemanticWIDTHSNUMBER, SemanticWIDTHSNUMBER] = [7, 9];
const MOBILE_COLUMN_WIDTH: [SemanticWIDTHSNUMBER, SemanticWIDTHSNUMBER] = [8, 8];

function RentSlotEventModalView({ currentPlace, event, onClose }: Required<RentSlotEventModalViewProps>) {
    const dispatch = useAppDispatch();

    const isRentSlotCancelling = useAppSelector((state) => selectIsAppointmentSlotCancelling(state, event.id));

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const columnsWidth = useMemo(() => (isMobile ? MOBILE_COLUMN_WIDTH : DESKTOP_COLUMN_WIDTH), [isMobile]);

    const onCancelHandle = useCallback(() => (
        dispatch(cancelRentSlotRequest({
            rentSlotIds: [event.id],
            placeName: currentPlace.name
        })).then((response) => {
            if (response.type === cancelRentSlotRequest.fulfilled.type) {
                onClose();
            }
        })
    ), [currentPlace.name, dispatch, event.id, onClose]);

    const rows = useMemo(
        () => [
            event.additionalInfo?.timeStart && (
                <CardRow
                    key="timeStart"
                    title="Время начала слота"
                    value={DateTime.fromISO(event.additionalInfo?.timeStart).toFormat("F")}
                    columnsWidth={columnsWidth}
                />
            ),
            event.additionalInfo?.timeEnd && (
                <CardRow
                    key="timeEnd"
                    title="Время окончания слота"
                    value={DateTime.fromISO(event.additionalInfo?.timeEnd).toFormat("F")}
                    columnsWidth={columnsWidth}
                />
            ),
            event.additionalInfo?.price && (
                <CardRow
                    key="price"
                    title="Стоимость"
                    value={event.additionalInfo?.price}
                    columnsWidth={columnsWidth}
                />
            ),
            <CardRow
                key="clinicName"
                title="Площадка"
                value={currentPlace.name}
                columnsWidth={columnsWidth}
            />
        ].filter((row) => !!row) as React.JSX.Element[],
        [
            columnsWidth,
            currentPlace.name,
            event.additionalInfo?.price,
            event.additionalInfo?.timeEnd,
            event.additionalInfo?.timeStart
        ]
    );

    return (
        <Modal
            className={modalStyles.modal}
            open
            onClose={onClose}
            closeIcon
            size="mini"
        >
            <Modal.Header className={modalStyles.modalHeader}>
                Свободный слот аренды
            </Modal.Header>
            <Modal.Content className={modalStyles.modalContent}>
                <CardGrid>
                    {rows}
                </CardGrid>
            </Modal.Content>
            <Modal.Actions className={modalStyles.modalActions}>
                <PrimaryButton
                    className={modalStyles.modalButton}
                    color="negative"
                    loading={isRentSlotCancelling}
                    disabled={isRentSlotCancelling}
                    onClick={onCancelHandle}
                >
                    Удалить слот
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}

export default function RentSlotEventModal({ currentPlace, event, onClose }: RentSlotEventModalViewProps) {
    return event
        ? (
            <RentSlotEventModalView
                currentPlace={currentPlace}
                event={event}
                onClose={onClose}
            />
        )
        : null;
}
