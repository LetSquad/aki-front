import {
    lazy,
    useCallback,
    useEffect,
    useMemo
} from "react";

import { useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { getAreaRequest } from "@store/area/reducer";
import {
    selectCurrentArea,
    selectIsCurrentAreaDeleting,
    selectIsCurrentAreaLoading,
    selectIsCurrentAreaLoadingFailed
} from "@store/area/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectCurrentUser } from "@store/user/selectors";

import AreaInfoDetailPlaceholder from "./Placeholders/AreaInfoDetailPlaceholder";
import styles from "./styles/Area.module.scss";

const AreaInfoDetails = lazy(/* webpackChunkName: "AreaInfoDetails" */ () => import("@components/Area/AreaInfoDetails"));

export default function Area() {
    const dispatch = useAppDispatch();

    const { areaId } = useParams();

    const currentArea = useAppSelector(selectCurrentArea);
    const isCurrentAreaLoading = useAppSelector(selectIsCurrentAreaLoading);
    const isCurrentAreaLoadingFailed = useAppSelector(selectIsCurrentAreaLoadingFailed);
    const isAreaDeleting = useAppSelector((state) => selectIsCurrentAreaDeleting(state, areaId));

    const currentUser = useAppSelector(selectCurrentUser);

    const isUserAreaOwner = useMemo(
        () => currentUser?.id === currentArea?.user?.id,
        [currentArea?.user?.id, currentUser?.id]
    );

    const getArea = useCallback(() => {
        dispatch(getAreaRequest(areaId || ""));
    }, [dispatch, areaId]);

    useEffect(() => {
        getArea();
    }, [getArea]);

    if (isCurrentAreaLoading) {
        return (
            <div className={styles.container}>
                <AreaInfoDetailPlaceholder />
            </div>
        );
    }

    if (isCurrentAreaLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о площадке"
                reload={getArea}
            />
        );
    }

    if (currentArea) {
        return (
            <div className={styles.container}>
                <Dimmer
                    active={isAreaDeleting}
                    inverted
                >
                    <Loader />
                </Dimmer>
                <AreaInfoDetails
                    currentArea={currentArea}
                    isUserAreaOwner={isUserAreaOwner}
                />
            </div>
        );
    }

    return <ErrorBlock />;
}
