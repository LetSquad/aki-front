import { useMemo } from "react";

import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import FooterContacts from "@components/Footer/FooterContacts";
import FooterLogo from "@components/Footer/FooterLogo";
import FooterSocials from "@components/Footer/FooterSocials";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import { AdminItems, LandlordItems, RenterItems } from "@coreUtils/MenuItems";
import { UserRole } from "@models/users/enums";
import { useAppSelector } from "@store/hooks";
import { selectUserRole } from "@store/info/selectors";

import styles from "./styles/AuthFooterContent.module.scss";

export default function AuthFooterContent() {
    const role = useAppSelector(selectUserRole);

    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const links = useMemo(() => {
        switch (role) {
            case UserRole.ADMIN: {
                return AdminItems;
            }
            case UserRole.LANDLORD: {
                return LandlordItems;
            }
            default: {
                return RenterItems;
            }
        }
    }, [role]);

    return (
        <div className={styles.footerContent}>
            {!isMobile && (
                <div className={styles.desktopContent}>
                    <FooterLogo />
                    <div className={styles.links}>
                        {links &&
                            links.map((link) => (
                                <Link
                                    className={styles.link}
                                    to={link.url}
                                    key={link.name}
                                >
                                    {link.name}
                                </Link>
                            ))}
                    </div>
                </div>
            )}
            <div className={styles.additionalContent}>
                <FooterSocials />
                <FooterContacts />
            </div>
        </div>
    );
}
