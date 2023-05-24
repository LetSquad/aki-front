import { useCallback, useRef } from "react";

import { Loader } from "semantic-ui-react";

import PlaceCard from "@components/Place/PlaceCard";
import { Place } from "@models/places/types";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";

import styles from "./styles/PlaceList.module.scss";

interface PlacesListProps {
    places: Place[];
    placesTotalPages?: number;
    isPlacesLoading: boolean;
    isPlacesLoadingFailed: boolean;
    currentPageNumber: number;
    onNextPage: () => void;
}

export default function PlacesList({
    places,
    placesTotalPages,
    isPlacesLoading,
    isPlacesLoadingFailed,
    currentPageNumber,
    onNextPage
}: PlacesListProps) {
    const observer = useRef<IntersectionObserver>(null);

    const lastPlaceElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isPlacesLoading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                const target = entries[0];
                if (target.isIntersecting && placesTotalPages && currentPageNumber < placesTotalPages) {
                    onNextPage();
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [isPlacesLoading, placesTotalPages, currentPageNumber, onNextPage]
    );

    return (
        <div className={styles.container}>
            {places?.map((place, index) => {
                let refElement;
                if (index === places.length - 1) {
                    refElement = <div ref={lastPlaceElementRef} />;
                }

                return (
                    <PlaceCard
                        key={place.id}
                        place={place}
                    >
                        {refElement}
                    </PlaceCard>
                );
            })}
            {isPlacesLoadingFailed && <LoadingErrorBlock isLoadingErrorObjectText="площадок" />}
            {isPlacesLoading && <div className={styles.loader}><Loader active /></div>}
        </div>
    );
}
