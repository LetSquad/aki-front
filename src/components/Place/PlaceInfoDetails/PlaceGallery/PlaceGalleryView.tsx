import { MouseEventHandler, useMemo } from "react";
import * as React from "react";

import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import FullScreenIcon from "@parts/ImageGaleryNav/FullScreenIcon";
import LeftNavIcon from "@parts/ImageGaleryNav/LeftNavIcon";
import RightNavIcon from "@parts/ImageGaleryNav/RigthNavIcon";

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
                    showThumbnails={!isMobile}
                    showBullets={isMobile}
                    items={galleryImages}
                    showPlayButton={false}
                />
            </div>
        </Segment>
    );
}
