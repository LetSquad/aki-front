import { useCallback, useEffect, useState } from "react";

import PlacesList from "@components/Place/PlacesList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getUserPlacesRequest } from "@store/place/reducer";
import {
    selectIsUserPlacesLoading,
    selectIsUserPlacesLoadingFailed,
    selectUserPlaces,
    selectUserPlacesTotalPages
} from "@store/place/selectors";

import styles from "./styles/UserPlaces.module.scss";

export default function UserPlaces() {
    const dispatch = useAppDispatch();

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    const places = useAppSelector(selectUserPlaces);
    const placesTotalPages = useAppSelector(selectUserPlacesTotalPages);
    const isPlacesLoading = useAppSelector(selectIsUserPlacesLoading);
    const isPlacesLoadingFailed = useAppSelector(selectIsUserPlacesLoadingFailed);

    const getPlaces = useCallback((pageNumber: number) => {
        dispatch(getUserPlacesRequest({ pageNumber, limit: 5 }));
    }, [dispatch]);

    const onNextPage = useCallback(() => {
        setCurrentPageNumber(currentPageNumber + 1);
        getPlaces(currentPageNumber + 1);
    }, [currentPageNumber, getPlaces]);

    const onErrorReload = useCallback(() => {
        getPlaces(currentPageNumber);
    }, [currentPageNumber, getPlaces]);

    useEffect(() => {
        getPlaces(currentPageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <PlacesList
                places={places}
                isPlacesLoading={isPlacesLoading}
                isPlacesLoadingFailed={isPlacesLoadingFailed}
                placesTotalPages={placesTotalPages}
                currentPageNumber={currentPageNumber}
                onNextPage={onNextPage}
                onErrorReload={onErrorReload}
            />
        </div>
    );
}
