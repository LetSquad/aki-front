import React, { useCallback, useEffect } from "react";

import { useMediaQuery } from "react-responsive";

import AuthForm from "@components/Auth/AuthForm";
import DesktopMenu from "@components/Header/DesktopMenu";
import MobileMenu from "@components/Header/MobileMenu";
import { TABLET_MAX_WIDTH } from "@coreUtils/constants";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setIsLoginOpen } from "@store/info/reducer";
import { selectIsLoginOpen, selectIsUserNotAuth } from "@store/info/selectors";
import { getUserRequest } from "@store/user/reducer";

interface HeaderProps {
    setSidebarOpen?: () => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
    const dispatch = useAppDispatch();

    const isLoginOpen = useAppSelector(selectIsLoginOpen);
    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    const isMobile = useMediaQuery({ maxWidth: TABLET_MAX_WIDTH });

    const onLoginClose = useCallback(() => {
        dispatch(setIsLoginOpen(false));
    }, [dispatch]);

    useEffect(() => {
        if (!isNotAuth) {
            dispatch(getUserRequest());
        }
    }, [dispatch, isNotAuth]);

    return (
        <>
            {
                isMobile && setSidebarOpen
                    ? <MobileMenu setSidebarOpen={setSidebarOpen} />
                    : <DesktopMenu />
            }
            {isLoginOpen && <AuthForm onClose={onLoginClose} />}
        </>
    );
}
