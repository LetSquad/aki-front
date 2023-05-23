import { useMemo } from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";

import basePlaceStyles from "../styles/PlaceInfoDetails.module.scss";
import styles from "./styles/PlaceGaleryView.module.scss";

interface PlaceGalleryViewProps {
    placeImages: string[];
}

export default function PlaceGalleryView({ placeImages }: PlaceGalleryViewProps) {
    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const galleryImages = useMemo<ReactImageGalleryItem[]>(() => (
        placeImages.map((image) => ({
            original: image as string,
            thumbnail: image as string,
            thumbnailLoading: "lazy",
            loading: "lazy"
        }))
    ), [placeImages]);

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>Галерея</span>
            <div className={styles.galleryContainer}>
                <ImageGallery
                    showThumbnails={!isMobile}
                    items={galleryImages}
                    lazyLoad
                    showPlayButton={false}
                />
            </div>
        </Segment>
    );
}
