import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { FormikProvider, useFormik } from "formik";
import { useMediaQuery } from "react-responsive";

import PlacesList from "@components/Place/PlacesList";
import PlacesListSorter from "@components/Place/PlacesList/PlacesListSorter";
import PlaceCatalogFilters from "@components/PlaceCatalog/PlaceCatalogFilters";
import { validationSchema } from "@components/PlaceCatalog/PlaceCatalogFilters/validation";
import NewRentModal from "@components/Rent/NewRentModal";
import { useToggle } from "@hooks/useToogle";
import { PlacesFiltersFieldsName, PlacesSortDirection, PlacesSortType } from "@models/places/enums";
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

export const initialValues: PlacesFiltersFormValues = {
    [PlacesFiltersFieldsName.SPECIALIZATION]: undefined,
    [PlacesFiltersFieldsName.RATING]: undefined,
    [PlacesFiltersFieldsName.PRICE_MIN]: undefined,
    [PlacesFiltersFieldsName.PRICE_MAX]: undefined,
    [PlacesFiltersFieldsName.CAPACITY_MIN]: undefined,
    [PlacesFiltersFieldsName.CAPACITY_MAX]: undefined,
    [PlacesFiltersFieldsName.SQUARE_MIN]: undefined,
    [PlacesFiltersFieldsName.SQUARE_MAX]: undefined,
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MIN]: undefined,
    [PlacesFiltersFieldsName.LEVEL_NUMBER_MAX]: undefined,
    [PlacesFiltersFieldsName.WITH_PARKING]: false,
    [PlacesFiltersFieldsName.DATE_FROM]: undefined,
    [PlacesFiltersFieldsName.DATE_TO]: undefined
};

export default function PlaceCatalog() {
    const dispatch = useAppDispatch();

    const withSidebar = useMediaQuery({ maxWidth: 1250 });

    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [isSidebarOpen, toggleSidebar, , closeSidebar] = useToggle();
    const [filterValues, setFilterValues] = useState(initialValues);
    const [sort, setSort] = useState<[PlacesSortType, PlacesSortDirection]>([PlacesSortType.PERSONAL, PlacesSortDirection.DESC]);

    const places = useAppSelector(selectPlaces);
    const placesTotalPages = useAppSelector(selectPlacesTotalPages);
    const isPlacesLoading = useAppSelector(selectIsPlacesLoading);
    const isPlacesLoadingFailed = useAppSelector(selectIsPlacesLoadingFailed);

    const getPlaces = useCallback((pageNumber: number, values: PlacesFiltersFormValues, sorting: [PlacesSortType, PlacesSortDirection]) => {
        dispatch(getPlacesRequest({
            pageNumber,
            limit: 5,
            sortType: sorting[0],
            sortDirection: sorting[1],
            ...values
        }));
    }, [dispatch]);

    const onFiltersSubmit = useCallback((values: PlacesFiltersFormValues) => {
        setCurrentPageNumber(1);
        setFilterValues(values);
        getPlaces(1, values, sort);
        closeSidebar();
    }, [closeSidebar, getPlaces, sort]);

    const formik = useFormik<PlacesFiltersFormValues>({
        onSubmit: onFiltersSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    const onNextPage = useCallback(() => {
        setCurrentPageNumber(currentPageNumber + 1);
        getPlaces(currentPageNumber + 1, filterValues, sort);
    }, [currentPageNumber, getPlaces, filterValues, sort]);

    const onErrorReload = useCallback(() => {
        getPlaces(currentPageNumber, filterValues, sort);
    }, [currentPageNumber, filterValues, getPlaces, sort]);

    const onSortChanged = useCallback((sorting: [PlacesSortType, PlacesSortDirection]) => {
        setSort(sorting);
        setCurrentPageNumber(1);
        getPlaces(currentPageNumber, filterValues, sorting);
    }, [currentPageNumber, filterValues, getPlaces]);

    const placesList = useMemo(() => (
        <div className={styles.placesContainer}>
            <NewRentModal />
            <PlacesListSorter
                sort={sort}
                onSortChanged={onSortChanged}
                disabled={isPlacesLoading}
            />
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
    ), [
        currentPageNumber,
        isPlacesLoading,
        isPlacesLoadingFailed,
        onErrorReload,
        onNextPage,
        onSortChanged,
        places,
        placesTotalPages,
        sort
    ]);

    const filters = useMemo(() => (
        <PlaceCatalogFilters isLoading={isPlacesLoading} />
    ), [isPlacesLoading]);

    useEffect(() => {
        getPlaces(currentPageNumber, filterValues, sort);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormikProvider value={formik}>
            {
                withSidebar
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
                                <div
                                    className={classNames({
                                        [styles.filtersSidebarHide]: !isSidebarOpen,
                                        [styles.filtersSidebar]: isSidebarOpen
                                    })}
                                >
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
                    )
            }
        </FormikProvider>
    );
}
