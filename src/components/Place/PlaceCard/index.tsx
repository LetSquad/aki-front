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

import PlaceAdditionalInfo from "@components/Place/PlaceAdditionalInfo";
import PlaceRating from "@components/Place/PlaceRating";
import { getPriceTypeTitleFromEnum } from "@coreUtils/utils";
import { BasePageSlugs } from "@models/pages/enums";
import { PriceType } from "@models/places/enums";
import { Place } from "@models/places/types";
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

    return (
        <Link
            to={generatePath(BasePageSlugs.PLACE, { placeId: place.id.toString() })}
            className={styles.link}
        >
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
                            renderFullscreenButton={(onClick: MouseEventHandler<HTMLElement>, disabled: boolean) => (
                                <FullScreenIcon
                                    onClick={onClick}
                                    disabled={disabled}
                                />
                            )}
                            showBullets
                            showThumbnails={false}
                            items={galleryImages}
                            lazyLoad
                            showPlayButton={false}
                        />
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.mainContentContainer}>
                            <div>
                                <span className={styles.title}>{place.name}</span>
                                <PlaceRating rating={place.rating} />
                            </div>
                            <span className={styles.address}>{place.address}</span>
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
                        {currentUser?.userRole === UserRole.RENTER && (
                            <PrimaryButton onClick={onRentModalOpen}>Забронировать</PrimaryButton>
                        )}
                    </div>
                </div>
            </Segment>
        </Link>
    );
}
