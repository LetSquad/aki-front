import { PropsWithChildren, useMemo } from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { generatePath, Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import PlaceAdditionalInfo from "@components/Place/PlaceAdditionalInfo";
import PlaceRating from "@components/Place/PlaceRating";
import { getPriceTypeTitleFromEnum } from "@coreUtils/utils";
import { BasePageSlugs } from "@models/pages/enums";
import { PriceType } from "@models/places/enums";
import { Place } from "@models/places/types";
import imagePlaceholder from "@static/images/imagePlaceholder.png";
import { useAppSelector } from "@store/hooks";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/PlaceCard.module.scss";

interface PlaceCardProps extends PropsWithChildren {
    place: Place;
}

export default function PlaceCard({ place, children }: PlaceCardProps) {
    const currentUser = useAppSelector(selectCurrentUser);

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
                            {currentUser &&
                            place.price.priceType === PriceType.FREE
                                ? <span className={styles.price}>{getPriceTypeTitleFromEnum(place.price.priceType)}</span>
                                : (
                                    <span className={styles.price}>
                                        {`от ${place.price.price}₽${getPriceTypeTitleFromEnum(place.price.priceType)}`}
                                    </span>
                                )}
                        </div>
                        <PlaceAdditionalInfo currentPlace={place} />
                    </div>
                </div>
            </Segment>
        </Link>
    );
}