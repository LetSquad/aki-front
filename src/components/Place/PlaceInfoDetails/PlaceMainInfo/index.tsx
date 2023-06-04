import React, { useCallback, useMemo, useRef } from "react";

import { useMediaQuery } from "react-responsive";
import { Segment } from "semantic-ui-react";

import MetroStationList from "@components/Metro/MetroStationList";
import PlaceAdditionalInfo from "@components/Place/PlaceAdditionalInfo";
import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";
import { useToggle } from "@hooks/useToogle";
import marker from "@static/images/marker.svg";

import { Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./styles/PlaceMainInfo.module.scss";

export default function PlaceMainInfo() {
    const currentPlace = useCurrentPlace();

    const isLargeMap = useMediaQuery({ maxWidth: 1100, minWidth: 801 });
    const isMediumMap = useMediaQuery({ maxWidth: 800, minWidth: 601 });
    const isSmallMap = useMediaQuery({ maxWidth: 600, minWidth: 401 });
    const isExtraSmallMap = useMediaQuery({ maxWidth: 400 });

    const mapRef = useRef<ymaps.Map | undefined>(undefined);

    const [isMapShow, toggleMap] = useToggle();

    const plusZoom = useCallback(() => {
        const map = mapRef.current;
        const currentZoom = mapRef.current?.getZoom();
        if (map && currentZoom && currentZoom < 20) {
            map.setZoom(currentZoom + 1);
        }
    }, []);

    const minusZoom = useCallback(() => {
        const map = mapRef.current;
        const currentZoom = map?.getZoom();
        if (map && currentZoom && currentZoom > 10) {
            map.setZoom(currentZoom - 1);
        }
    }, []);

    const mapSize = useMemo(() => {
        if (isLargeMap) {
            return [650, 350];
        }
        if (isMediumMap) {
            return [500, 325];
        }
        if (isSmallMap) {
            return [375, 300];
        }
        if (isExtraSmallMap) {
            return [260, 275];
        }
        return [800, 400];
    }, [isExtraSmallMap, isLargeMap, isMediumMap, isSmallMap]);

    return (
        <Segment>
            <div className={styles.container}>
                <div className={styles.description}>
                    <span className={styles.descriptionTitle}>Описание площадки</span>
                    <span className={styles.descriptionContent}>{currentPlace.description}</span>
                </div>
                <PlaceAdditionalInfo currentPlace={currentPlace} />
                <div className={styles.contacts}>
                    <div className={styles.contactsAddressContainer}>
                        <span className={styles.contactsItem}>{currentPlace.address}</span>
                        {currentPlace.coordinates && (
                            <span
                                aria-hidden
                                className={styles.contactsMap}
                                onClick={toggleMap}
                            >
                                {isMapShow ? "Скрыть карту" : "Показать на карте"}
                            </span>
                        )}
                    </div>
                    {isMapShow && currentPlace.coordinates && (
                        <div
                            className={styles.map}
                            style={{ height: `${mapSize[1]}px`, width: `${mapSize[0]}px` }}
                        >
                            <div className={styles.mapZoomButtons}>
                                <div
                                    className={styles.mapZoomButtonPlus}
                                    onClick={plusZoom}
                                    aria-hidden
                                />
                                <div
                                    className={styles.mapZoomButtonMinus}
                                    onClick={minusZoom}
                                    aria-hidden
                                />
                            </div>
                            <Map
                                instanceRef={mapRef}
                                height={mapSize[1]}
                                width={mapSize[0]}
                                options={{
                                    maxZoom: 20,
                                    minZoom: 10
                                }}
                                defaultState={{ zoom: 15, center: [currentPlace.coordinates.latitude, currentPlace.coordinates.longitude] }}
                            >
                                <Placemark
                                    options={{ iconLayout: "default#image", iconImageHref: marker }}
                                    geometry={[currentPlace.coordinates.latitude, currentPlace.coordinates.longitude]}
                                />
                            </Map>
                        </div>
                    )}
                    {currentPlace.metroStations && <MetroStationList stations={currentPlace.metroStations} />}
                    <div className={styles.contactsLinks}>
                        <a
                            href={currentPlace.site}
                            target="_blank"
                            className={styles.contactsLink}
                            rel="noreferrer"
                        >
                            {currentPlace.site}
                        </a>
                        <a
                            href={`tel:${currentPlace.phone}`}
                            className={styles.contactsLink}
                        >
                            {currentPlace.phone}
                        </a>
                        <a
                            href={`mailto:${currentPlace.email}`}
                            className={styles.contactsLink}
                        >
                            {currentPlace.email}
                        </a>
                    </div>
                </div>
            </div>
        </Segment>
    );
}
