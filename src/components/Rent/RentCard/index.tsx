import React, { PropsWithChildren, useCallback, useMemo } from "react";

import classNames from "classnames";
import { DateTime } from "luxon";
import { generatePath, Link } from "react-router-dom";
import {
    Dimmer,
    Icon,
    Loader,
    Popup,
    Segment
} from "semantic-ui-react";

import RentRating from "@components/Rent/RentCard/RentRating";
import { getRentStatusColorFromEnum, getRentStatusTitleFromEnum } from "@components/Rent/utils/utils";
import { BasePageSlugs } from "@models/pages/enums";
import { RentStatus } from "@models/rent/enums";
import { Rent } from "@models/rent/types";
import BlockIcons, { BlockIconsIndent } from "@parts/BlockIcons/BlockIcons";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { cancelRentRequest } from "@store/rent/reducer";
import { selectIsRentCancelling } from "@store/rent/selectors";

import styles from "./styles/RentCard.module.scss";

interface RentCardProps extends PropsWithChildren {
    rent: Rent;
}

export default function RentCard({ rent, children }: RentCardProps) {
    const dispatch = useAppDispatch();

    const isRentCancelling = useAppSelector((state) => selectIsRentCancelling(state, rent.id));

    const rentPrice = useMemo(() => {
        let price = 0;
        for (const rentSlot of rent.rentSlots) {
            price += rentSlot.price;
        }

        return price;
    }, [rent.rentSlots]);

    const onCancelHandle = useCallback(() => (
        dispatch(cancelRentRequest({
            rentId: rent.id,
            placeName: rent.place.name
        }))
    ), [dispatch, rent.id, rent.place.name]);

    return (
        <Segment>
            {isRentCancelling && (
                <Dimmer
                    active
                    inverted
                >
                    <Loader />
                </Dimmer>
            )}
            {children && children}
            <BlockIcons
                indent={BlockIconsIndent.LARGE}
                deleteIconName="cancel"
                deleteAction={onCancelHandle}
                deleteConfirmationText={`Вы уверены, что хотите отменить бронирование площадки "${rent.place.name}"`}
                modalTitle="Подтверждение отмены бронирования"
            />
            <div className={styles.container}>
                <div className={styles.statusContainer}>
                    <span
                        className={classNames(
                            styles.status,
                            getRentStatusColorFromEnum(rent.status)
                        )}
                    >
                        {getRentStatusTitleFromEnum(rent.status)}
                    </span>
                    {rent.banReason && (
                        <Popup
                            content={rent.banReason}
                            position="top center"
                            trigger={(
                                <Icon
                                    className={getRentStatusColorFromEnum(rent.status)}
                                    name="info circle"
                                />
                            )}
                        />
                    )}
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.mainContentContainer}>
                        <Link to={generatePath(BasePageSlugs.PLACE, { placeId: rent.place.toString() })}>
                            <span className={styles.title}>{rent.place.name}</span>
                        </Link>
                        <div className={styles.rentInfoContainer}>
                            <span className={styles.rentInfoDates}>
                                {`C ${DateTime.fromISO(rent.rentSlots[0].timeStart).toFormat("F")} до ${DateTime.fromISO(rent.rentSlots.at(-1)?.timeEnd as string).toFormat("F")}`}
                            </span>
                            <span className={styles.rentInfoPrice}>{`~${rentPrice} ₽`}</span>
                        </div>
                        {rent.status === RentStatus.CLOSED && <RentRating rent={rent} />}
                    </div>
                    <div className={styles.contacts}>
                        <span className={styles.contactsItem}>{rent.place.address}</span>
                        <div className={styles.contactsLinks}>
                            <a
                                href={rent.place.site}
                                target="_blank"
                                className={styles.contactsLink}
                                rel="noreferrer"
                            >
                                {rent.place.site}
                            </a>
                            <a
                                href={`tel:${rent.place.phone}`}
                                className={styles.contactsLink}
                            >
                                {rent.place.phone}
                            </a>
                            <a
                                href={`mailto:${rent.place.email}`}
                                className={styles.contactsLink}
                            >
                                {rent.place.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Segment>
    );
}
