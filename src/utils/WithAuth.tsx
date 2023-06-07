import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import AuthForm from "@components/Auth/AuthForm";
import { BasePageSlugs } from "@models/pages/enums";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setIsLoginOpen } from "@store/info/reducer";
import { selectIsUserNotAuth } from "@store/info/selectors";
import { getUserRequest } from "@store/user/reducer";
import { selectIsCurrentUserLoadingFailed } from "@store/user/selectors";

export default function WithAuth(props: { children: React.JSX.Element }) {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isNotAuth = useAppSelector(selectIsUserNotAuth);
    const isUserInfoLoadingFailed = useAppSelector(selectIsCurrentUserLoadingFailed);

    const reloadUserInfo = useCallback(() => dispatch(getUserRequest()), [dispatch]);

    const onLoginClose = useCallback(() => {
        dispatch(setIsLoginOpen(false));
        navigate(BasePageSlugs.DASHBOARD);
    }, [dispatch, navigate]);

    if (isNotAuth) {
        return <AuthForm onClose={onLoginClose} />;
    }

    if (isUserInfoLoadingFailed) {
        return (
            <LoadingErrorBlock
                isLoadingErrorObjectText="информации о профиле"
                reload={reloadUserInfo}
            />
        );
    }

    return props.children;
}
