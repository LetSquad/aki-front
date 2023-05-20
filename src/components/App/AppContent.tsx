import { useCallback } from "react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import Routes from "@pages/Routes";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getUserRequest } from "@store/user/reducer";
import { selectIsCurrentUserLoadingFailed } from "@store/user/selectors";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./styles/AppContent.module.scss";

interface AppContentProps {
    openSidebar?: () => void;
}

export default function AppContent({ openSidebar }: AppContentProps) {
    const dispatch = useAppDispatch();

    const isUserInfoLoadingFailed = useAppSelector(selectIsCurrentUserLoadingFailed);

    const reloadUserInfo = useCallback(() => dispatch(getUserRequest()), [dispatch]);

    return (
        <>
            <Header setSidebarOpen={openSidebar} />
            <div className={styles.container}>
                <div className={styles.mainContentWrapper}>
                    {
                        isUserInfoLoadingFailed
                            ? (
                                <LoadingErrorBlock
                                    isLoadingErrorObjectText="информации о профиле"
                                    reload={reloadUserInfo}
                                />
                            )
                            : (
                                <WithSuspense>
                                    <Routes />
                                </WithSuspense>
                            )
                    }
                </div>
                <Footer />
            </div>
        </>
    );
}
