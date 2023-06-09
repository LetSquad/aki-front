import { lazy, useCallback, useRef } from "react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { PlaceFieldsName } from "@models/places/enums";
import { PlaceAddFormValues, PlaceDetailsFormRef } from "@models/places/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addPlaceRequest } from "@store/place/reducer";
import { selectIsPlaceAdding } from "@store/place/selectors";

import styles from "./styles/AddPlace.module.scss";

const PlaceDetailsForm = lazy(/* webpackChunkName: "PlaceDetailsForm" */ () => import("../PlaceDetailsForm"));

export default function AddPlace() {
    const dispatch = useAppDispatch();

    const addPlaceFormRef = useRef<PlaceDetailsFormRef>(null);

    const isPlaceAdding = useAppSelector(selectIsPlaceAdding);

    const addPlace = useCallback(
        (values: PlaceAddFormValues) => {
            dispatch(addPlaceRequest({ ...values, addPlaceFormRef }));
        },
        [dispatch]
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Создайте новую площадку</h1>
            <WithSuspense>
                <PlaceDetailsForm
                    initialValues={{
                        [PlaceFieldsName.NAME]: "",
                        [PlaceFieldsName.DESCRIPTION]: "",
                        [PlaceFieldsName.ADDRESS]: "",
                        [PlaceFieldsName.METRO_STATIONS]: [],
                        [PlaceFieldsName.EMAIL]: "",
                        [PlaceFieldsName.SITE]: "",
                        [PlaceFieldsName.SPECIALIZATION]: [],
                        [PlaceFieldsName.PHONE]: "",
                        [PlaceFieldsName.FULL_SQUARE]: undefined,
                        [PlaceFieldsName.FREE_SQUARE]: undefined,
                        [PlaceFieldsName.MAX_CAPACITY]: undefined,
                        [PlaceFieldsName.MIN_CAPACITY]: undefined,
                        [PlaceFieldsName.LEVEL_NUMBER]: undefined,
                        [PlaceFieldsName.COORDINATES]: undefined,
                        [PlaceFieldsName.PARKING]: false
                    }}
                    ref={addPlaceFormRef}
                    onSubmit={addPlace}
                    isLoading={isPlaceAdding}
                />
            </WithSuspense>
        </div>
    );
}
