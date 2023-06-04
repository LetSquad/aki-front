import {
    MouseEvent,
    MouseEventHandler,
    PropsWithChildren,
    useCallback,
    useMemo
} from "react";
import * as React from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { generatePath, Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import MetroStationList from "@components/Metro/MetroStationList";
import FavoritePlaceIcon from "@components/Place/FavoritePlaceIcon";
import PlaceAdditionalInfo from "@components/Place/PlaceAdditionalInfo";
import PlaceRating from "@components/Place/PlaceRating";
import { getPriceTypeTitleFromEnum } from "@coreUtils/utils";
import { BasePageSlugs } from "@models/pages/enums";
import { PriceType } from "@models/places/enums";
import { Place } from "@models/places/types";
import { RentSlotStatus } from "@models/rentSlots/enums";
import { UserRole } from "@models/users/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import FullScreenIcon from "@parts/ImageGaleryNav/FullScreenIcon";
import LeftNavIcon from "@parts/ImageGaleryNav/LeftNavIcon";
import RightNavIcon from "@parts/ImageGaleryNav/RigthNavIcon";
import imagePlaceholder from "@static/images/imagePlaceholder.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setCurrentRentPlace } from "@store/rent/reducer";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/PlaceCard.module.scss";

interface PlaceCardProps extends PropsWithChildren {
    place: Place;
}

export default function PlaceCard({ place, children }: PlaceCardProps) {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(selectCurrentUser);

    const onRentModalOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(setCurrentRentPlace(place));
    }, [dispatch, place]);

    const galleryImages = useMemo<ReactImageGalleryItem[]>(() => (
        (place.placeImages ?? [imagePlaceholder]).map((image) => ({
            original: image as string,
            loading: "lazy"
        }))
    ), [place.placeImages]);

    const isPlaceHaveOpenSlots = useMemo(() => (
        place.rentSlots &&
        place.rentSlots?.filter((rentSlot) => rentSlot.status === RentSlotStatus.OPEN).length > 0
    ), [place.rentSlots]);

    const placeCardContent = useMemo(() => (
        <Segment>
            {children && children}
            <div className={styles.container}>
                <div className={styles.galleryContainer}>
                    <ImageGallery
                        stopPropagation
                        useBrowserFullscreen
                        renderRightNav={(onClick: MouseEventHandler<HTMLElement>, disabled: boolean) => (
                            <RightNavIcon
                                onClick={onClick}
                                disabled={disabled}
                            />
                        )}
                        renderLeftNav={(onClick: MouseEventHandler<HTMLElement>, disabled: boolean) => (
                            <LeftNavIcon
                                onClick={onClick}
                                disabled={disabled}
                            />
                        )}
                        renderFullscreenButton={(onClick: MouseEventHandler<HTMLElement>, isFullscreen: boolean) => (
                            <FullScreenIcon
                                onClick={onClick}
                                isFullscreen={isFullscreen}
                            />
                        )}
                        showBullets
                        showThumbnails={false}
                        items={galleryImages}
                        showPlayButton={false}
                    />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.mainContentContainer}>
                        <div className={styles.titleContainer}>
                            <div>
                                <span className={styles.title}>{place.name}</span>
                                <PlaceRating rating={place.rating} />
                            </div>
                            <FavoritePlaceIcon place={place} />
                        </div>
                        <span className={styles.address}>{place.address}</span>
                        {place.metroStations && <MetroStationList stations={place.metroStations} />}
                        {currentUser && (
                            place.price.priceType === PriceType.FREE
                                ? (
                                    <span className={styles.price}>
                                        {getPriceTypeTitleFromEnum(place.price.priceType)}
                                    </span>
                                )
                                : (
                                    <span className={styles.price}>
                                        {`от ${place.price.price}₽${getPriceTypeTitleFromEnum(place.price.priceType)}`}
                                    </span>
                                )
                        )}
                    </div>
                    <PlaceAdditionalInfo currentPlace={place} />
                    {currentUser?.userRole === UserRole.RENTER && isPlaceHaveOpenSlots && (
                        <PrimaryButton onClick={onRentModalOpen}>Забронировать</PrimaryButton>
                    )}
                </div>
            </div>
        </Segment>
    ), [children, currentUser, galleryImages, isPlaceHaveOpenSlots, onRentModalOpen, place]);

    return currentUser
        ? (
            <Link
                to={generatePath(BasePageSlugs.PLACE, { placeId: place.id.toString() })}
                className={styles.link}
            >
                {placeCardContent}
            </Link>
        )
        : placeCardContent;
}
