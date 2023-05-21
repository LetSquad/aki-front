import { useMemo } from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";

import baseAreaStyles from "../styles/AreaInfoDetails.module.scss";
import styles from "./styles/AreaGaleryView.module.scss";

interface AreaGalleryViewProps {
    areaImages: string[];
}

export default function AreaGalleryView({ areaImages }: AreaGalleryViewProps) {
    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const galleryImages = useMemo<ReactImageGalleryItem[]>(() => (
        areaImages.map((image) => ({
            original: image as string,
            thumbnail: image as string,
            thumbnailLoading: "lazy",
            loading: "lazy"
        }))
    ), [areaImages]);

    return (
        <Segment>
            <span className={baseAreaStyles.secondaryTitle}>Галерея</span>
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
