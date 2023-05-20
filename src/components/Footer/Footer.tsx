import AuthFooterContent from "@components/Footer/AuthFooterContent";
import NotAuthFooterContent from "@components/Footer/NotAuthFooterContent";
import { useAppSelector } from "@store/hooks";
import { selectIsUserNotAuth } from "@store/info/selectors";

import styles from "./styles/Footer.module.scss";

export default function Footer() {
    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    return (
        <footer className={styles.footer}>
            {
                isNotAuth
                    ? <NotAuthFooterContent />
                    : <AuthFooterContent />
            }
        </footer>
    );
}
