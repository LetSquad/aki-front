import React, {
    lazy,
    useCallback,
    useEffect,
    useMemo
} from "react";

import { useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPlaceRequest } from "@store/place/reducer";
import {
    selectCurrentPlace,
    selectIsCurrentPlaceDeleting,
    selectIsCurrentPlaceLoading,
    selectIsCurrentPlaceLoadingFailed
} from "@store/place/selectors";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/Place.module.scss";

const PlaceInfoDetails = lazy(/* webpackChunkName: "PlaceInfoDetails" */ () => import("@components/Place/PlaceInfoDetails"));

export default function PlaceInfo() {
    const dispatch = useAppDispatch();

    const { placeId } = useParams();

    const currentPlace = useAppSelector(selectCurrentPlace);
    const isCurrentPlaceLoading = useAppSelector(selectIsCurrentPlaceLoading);
    const isCurrentPlaceLoadingFailed = useAppSelector(selectIsCurrentPlaceLoadingFailed);
    const isPlaceDeleting = useAppSelector((state) => selectIsCurrentPlaceDeleting(state, placeId));

    const currentUser = useAppSelector(selectCurrentUser);

    const isUserPlaceOwner = useMemo(
        () => currentUser?.id === currentPlace?.user?.id,
        [currentPlace?.user?.id, currentUser?.id]
    );

    const getPlace = useCallback(() => {
        dispatch(getPlaceRequest(placeId || ""));
    }, [dispatch, placeId]);

    useEffect(() => {
        getPlace();
    }, [getPlace]);

    if (isCurrentPlaceLoading) {
        return (
            <div className={styles.container}>
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader
                        active
                        inline="centered"
                    />
                </div>
            </div>
        );
    }

    if (isCurrentPlaceLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о площадке"
                reload={getPlace}
            />
        );
    }

    if (currentPlace) {
        return (
            <div className={styles.container}>
                <Dimmer
                    active={isPlaceDeleting}
                    inverted
                >
                    <Loader />
                </Dimmer>
                <PlaceInfoDetails
                    currentPlace={currentPlace}
                    isUserPlaceOwner={isUserPlaceOwner}
                />
            </div>
        );
    }

    return <ErrorBlock />;
}
