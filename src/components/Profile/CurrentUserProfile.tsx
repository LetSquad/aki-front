import { lazy, useCallback } from "react";

import UserInfoDetailsPlaceholder from "@components/Profile/Placeholders/UserInfoDetailsPlaceholder";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getUserRequest } from "@store/user/reducer";
import { selectCurrentUser, selectIsCurrentUserLoading, selectIsCurrentUserLoadingFailed } from "@store/user/selectors";

import styles from "./styles/Profiles.module.scss";

const UserInfoDetails = lazy(/* webpackChunkName: "UserInfoDetails" */ () => import("./UserInfoDetails"));

export default function CurrentUserProfile() {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectCurrentUser);
    const isCurrentUserLoading = useAppSelector(selectIsCurrentUserLoading);
    const isCurrentUserLoadingFailed = useAppSelector(selectIsCurrentUserLoadingFailed);

    const reloadUser = useCallback(() => {
        dispatch(getUserRequest());
    }, [dispatch]);

    if (isCurrentUserLoading) {
        return (
            <div className={styles.container}>
                <UserInfoDetailsPlaceholder />
            </div>
        );
    }

    if (isCurrentUserLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о вашем профиле"
                reload={reloadUser}
            />
        );
    }

    if (user) {
        return (
            <div className={styles.container}>
                <UserInfoDetails
                    user={user}
                    editable
                />
            </div>
        );
    }

    return <ErrorBlock />;
}
