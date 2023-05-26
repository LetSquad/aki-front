import React, { useCallback, useEffect, useMemo } from "react";

import { Navigate, useParams } from "react-router-dom";
import { Loader, Segment } from "semantic-ui-react";

import Calendar from "@components/Schedule/Calendar";
import partsStyles from "@coreStyles/baseParts.module.scss";
import { Place } from "@models/places/types";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPlaceRequest } from "@store/place/reducer";
import { selectCurrentPlace, selectIsCurrentPlaceLoading, selectIsCurrentPlaceLoadingFailed } from "@store/place/selectors";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/Schedule.module.scss";

export default function Schedule() {
    const dispatch = useAppDispatch();
    const { placeId } = useParams();

    const currentPlace = useAppSelector(selectCurrentPlace);
    const isCurrentPlaceLoadingFailed = useAppSelector(selectIsCurrentPlaceLoadingFailed);
    const isCurrentPlaceLoading = useAppSelector(selectIsCurrentPlaceLoading);

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

    if (isCurrentPlaceLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о расписании"
                reload={getPlace}
            />
        );
    }

    if (isCurrentPlaceLoading) {
        return (
            <div className={partsStyles.flexBaseCenterContainer}>
                <Loader
                    active
                    inline="centered"
                />
            </div>
        );
    }

    if (!isUserPlaceOwner) {
        return <Navigate to="not-found" />;
    }

    return (
        <div className={styles.container}>
            <Segment className={styles.segment}>
                <Calendar currentPlace={currentPlace as Place} />
            </Segment>
        </div>
    );
}
