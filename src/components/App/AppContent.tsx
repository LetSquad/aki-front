import { useCallback } from "react";

import Footer from "@components/Footer";
import { WithSuspense } from "@coreUtils/WithSuspense";
import Routes from "@pages/Routes";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getUserRequest } from "@store/user/reducer";
import { selectIsCurrentUserLoadingFailed } from "@store/user/selectors";

import styles from "./styles/AppContent.module.scss";

export default function AppContent() {
    const dispatch = useAppDispatch();

    const isUserInfoLoadingFailed = useAppSelector(selectIsCurrentUserLoadingFailed);

    const reloadUserInfo = useCallback(() => dispatch(getUserRequest()), [dispatch]);

    return (
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
    );
}
