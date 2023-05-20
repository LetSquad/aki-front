import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import AuthForm from "@components/Auth/AuthForm";
import { BasePageSlugs } from "@models/pages/enums";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setIsLoginOpen } from "@store/info/reducer";
import { selectIsUserNotAuth } from "@store/info/selectors";

export default function WithAuth(props: { children: React.JSX.Element }) {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    const onLoginClose = useCallback(() => {
        dispatch(setIsLoginOpen(false));
        navigate(BasePageSlugs.DASHBOARD);
    }, [dispatch, navigate]);

    if (isNotAuth) {
        return <AuthForm onClose={onLoginClose} />;
    }
    return props.children;
}
