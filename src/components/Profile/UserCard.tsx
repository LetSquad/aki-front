import { lazy, useCallback } from "react";

import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";

import apiUrls from "@api/apiUrls";
import UserInfoDetailsPlaceholder from "@components/Profile/Placeholders/UserInfoDetailsPlaceholder";
import { UserResponse } from "@models/responses/types";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppSelector } from "@store/hooks";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/Profiles.module.scss";

const UserInfoDetails = lazy(/* webpackChunkName: "UserInfoDetails" */ () => import("./UserInfoDetails"));

export default function UserCard() {
    const { userId } = useParams();

    const user = useAppSelector(selectCurrentUser);

    const [{
        data,
        loading: isUserLoading,
        error: isUserLoadingFailed
    }, reloadUser] = useAxios<UserResponse>({ url: apiUrls.userId(userId as string), method: "GET" });

    const fetchUser = useCallback(() => {
        reloadUser().catch(() => {});
    }, [reloadUser]);

    if (isUserLoading) {
        return (
            <div className={styles.container}>
                <UserInfoDetailsPlaceholder />
            </div>
        );
    }

    if (isUserLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о пользователе"
                reload={fetchUser}
            />
        );
    }

    if (data?.dataBlock) {
        return (
            <div className={styles.container}>
                <UserInfoDetails
                    user={data.dataBlock}
                    editable={user?.userId === data.dataBlock.userId}
                />
            </div>
        );
    }

    return <ErrorBlock text={`Пользователь с id ${userId} не найден`} />;
}
