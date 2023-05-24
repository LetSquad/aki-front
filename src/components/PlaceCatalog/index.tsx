import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { useMediaQuery } from "react-responsive";

import PlacesList from "@components/Place/PlacesList";
import PlaceCatalogFilters, { initialValues } from "@components/PlaceCatalog/PlaceCatalogFilters";
import { useToggle } from "@hooks/useToogle";
import { PlacesFiltersFormValues } from "@models/places/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPlacesRequest } from "@store/place/reducer";
import {
    selectIsPlacesLoading,
    selectIsPlacesLoadingFailed,
    selectPlaces,
    selectPlacesTotalPages
} from "@store/place/selectors";

import styles from "./styles/PlaceCatalog.module.scss";

export default function PlaceCatalog() {
    const dispatch = useAppDispatch();

    const withSidebar = useMediaQuery({ maxWidth: 1250 });

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [isSidebarOpen, toggleSidebar] = useToggle();

    const places = useAppSelector(selectPlaces);
    const placesTotalPages = useAppSelector(selectPlacesTotalPages);
    const isPlacesLoading = useAppSelector(selectIsPlacesLoading);
    const isPlacesLoadingFailed = useAppSelector(selectIsPlacesLoadingFailed);

    const getPlaces = useCallback((pageNumber: number, values: PlacesFiltersFormValues = initialValues) => {
        dispatch(getPlacesRequest({ pageNumber, limit: 5, ...values }));
    }, [dispatch]);

    const onNextPage = useCallback(() => {
        setCurrentPageNumber(currentPageNumber + 1);
        getPlaces(currentPageNumber + 1);
    }, [currentPageNumber, getPlaces]);

    const onFiltersSubmit = useCallback((values: PlacesFiltersFormValues) => {
        setCurrentPageNumber(1);
        getPlaces(1, values);
    }, [getPlaces]);

    const placesList = useMemo(() => (
        <PlacesList
            places={places}
            isPlacesLoading={isPlacesLoading}
            isPlacesLoadingFailed={isPlacesLoadingFailed}
            placesTotalPages={placesTotalPages}
            currentPageNumber={currentPageNumber}
            onNextPage={onNextPage}
        />
    ), [currentPageNumber, isPlacesLoading, isPlacesLoadingFailed, onNextPage, places, placesTotalPages]);

    const filters = useMemo(() => (
        <PlaceCatalogFilters
            onSubmit={onFiltersSubmit}
            isLoading={isPlacesLoading}
        />
    ), [isPlacesLoading, onFiltersSubmit]);

    useEffect(() => {
        getPlaces(currentPageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return withSidebar
        ? (
            <div className={styles.container}>
                {placesList}
                <div className={classNames({ [styles.sidebarClose]: !isSidebarOpen, [styles.sidebarOpen]: isSidebarOpen })}>
                    <div
                        aria-hidden
                        className={isSidebarOpen ? styles.sidebarButtonOpen : styles.sidebarButton}
                        onClick={toggleSidebar}
                    >
                        <p className={styles.sidebarButtonText}>Фильтр</p>
                    </div>
                    <div className={classNames({ [styles.filtersSidebarHide]: !isSidebarOpen, [styles.filtersSidebar]: isSidebarOpen })}>
                        {filters}
                    </div>
                </div>
            </div>
        )
        : (
            <div className={styles.container}>
                {placesList}
                <div className={styles.filters}>
                    {filters}
                </div>
            </div>
        );
}
