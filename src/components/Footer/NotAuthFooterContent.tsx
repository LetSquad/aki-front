import { useMediaQuery } from "react-responsive";

import FooterContacts from "@components/Footer/FooterContacts";
import FooterLogo from "@components/Footer/FooterLogo";
import FooterSocials from "@components/Footer/FooterSocials";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";

import styles from "./styles/NotAuthFooterContent.module.scss";

export default function NotAuthFooterContent() {
    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    return (
        <div className={styles.footerContent}>
            {!isMobile && <FooterLogo />}
            <FooterSocials />
            <FooterContacts />
        </div>
    );
}
