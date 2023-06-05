import React, { useCallback, useEffect, useState } from "react";

import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import AuthForm from "@components/Auth/AuthForm";
import DesktopMenu from "@components/Header/DesktopMenu";
import MobileMenu from "@components/Header/MobileMenu";
import { TABLET_MAX_WIDTH } from "@coreUtils/constants";
import { useLogout } from "@hooks/useLogout";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { useToggle } from "@hooks/useToogle";
import { BasePageSlugs } from "@models/pages/enums";
import ImageWithLoading from "@parts/ImageWithLoading/ImageWithLoading";
import nullUserAvatar from "@static/images/nullUserAvatar.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setIsLoginOpen } from "@store/info/reducer";
import { selectIsLoginOpen, selectIsUserNotAuth } from "@store/info/selectors";
import { getUserRequest } from "@store/user/reducer";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/Header.module.scss";

export default function Header() {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectCurrentUser);
    const isLoginOpen = useAppSelector(selectIsLoginOpen);
    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);
    const [isSidebarOpen, , openSidebar, closeSidebar] = useToggle();

    const navigate = useNavigate();
    const menuOptions = useMenuOptions(closeSidebar);
    const logout = useLogout();

    const isMobile = useMediaQuery({ maxWidth: TABLET_MAX_WIDTH });

    const onProfileClick = useCallback(() => {
        navigate(BasePageSlugs.MY_PROFILE);
        closeSidebar();
    }, [navigate, closeSidebar]);

    const onLogoutClick = useCallback(() => {
        closeSidebar();
        logout();
    }, [logout, closeSidebar]);

    const onLoginClose = useCallback(() => {
        dispatch(setIsLoginOpen(false));
    }, [dispatch]);

    const handleScroll = useCallback(() => {
        const moving = document.querySelector("#app")?.scrollTop || 0;

        setVisible(position > moving);
        setPosition(moving);
    }, [position]);

    useEffect(() => {
        if (!isNotAuth) {
            dispatch(getUserRequest());
        }
    }, [dispatch, isNotAuth]);

    useEffect(() => {
        document.querySelector("#app")?.addEventListener("scroll", handleScroll);
        return (() => {
            document.querySelector("#app")?.removeEventListener("scroll", handleScroll);
        });
    }, [handleScroll]);

    return (
        <>
            {isMobile && (
                <div className={isSidebarOpen ? styles.sidebarShow : styles.sidebarClose}>
                    <Icon
                        name="close"
                        link
                        onClick={closeSidebar}
                        size="big"
                        className={styles.sidebarCloseIcon}
                    />
                    <ImageWithLoading
                        circular
                        onClick={onProfileClick}
                        src={user?.userImage || nullUserAvatar}
                        className={styles.sidebarImage}
                    />
                    <div className={styles.sidebarItemsContainer}>
                        {menuOptions}
                        <div
                            aria-hidden
                            className={styles.sidebarExitItem}
                            onClick={onLogoutClick}
                        >
                            Выйти
                        </div>
                    </div>
                </div>
            )}
            <Menu
                attached="top"
                className={
                    classNames(
                        styles.header,
                        { [styles.headerVisible]: visible, [styles.headerHidden]: !visible, [styles.headerScroll]: position > 30 }
                    )
                }
            >
                {
                    isMobile
                        ? <MobileMenu setSidebarOpen={openSidebar} />
                        : <DesktopMenu />
                }
            </Menu>
            {isLoginOpen && <AuthForm onClose={onLoginClose} />}
        </>
    );
}
