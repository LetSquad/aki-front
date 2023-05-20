import { useCallback, useEffect } from "react";

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useMediaQuery } from "react-responsive";

import apiUrls from "@api/apiUrls";
import AppContent from "@components/App/AppContent";
import SidebarMenu from "@components/Header/SidebarMenu/SidebarMenu";
import { TABLET_MAX_WIDTH } from "@coreUtils/constants";
import { useLogout } from "@hooks/useLogout";
import { SignInResponse } from "@models/responses/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setRole } from "@store/info/reducer";
import { selectIsUserNotAuth } from "@store/info/selectors";

import styles from "./styles/App.module.scss";

export default function App() {
    const dispatch = useAppDispatch();

    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    const logout = useLogout();

    const isMobile = useMediaQuery({ maxWidth: TABLET_MAX_WIDTH });

    const refreshAuthLogic = useCallback(
        () => axios.post<SignInResponse>(apiUrls.refreshToken(), undefined, { validateStatus: () => true })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("aki_role", JSON.stringify(response.data.dataBlock.role));
                    dispatch(setRole(response.data.dataBlock.role));
                    return;
                }

                logout();
                throw new Error("Error while authentication");
            }),
        [dispatch, logout]
    );

    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []);

    return (
        <div className={styles.app}>
            {
                isMobile && !isNotAuth
                    ? <SidebarMenu />
                    : <AppContent />
            }
        </div>
    );
}
