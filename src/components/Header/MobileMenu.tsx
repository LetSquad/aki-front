import { Dropdown, Icon, Menu } from "semantic-ui-react";

import HeaderLogo from "@components/Header/HeaderLogo";
import LoginButton from "@components/Header/LoginButton";
import { useAppSelector } from "@store/hooks";
import { selectIsUserNotAuth } from "@store/info/selectors";

import headerStyles from "./styles/Header.module.scss";
import styles from "./styles/MobileMenu.module.scss";

interface MobileMenuProps {
    setSidebarOpen: () => void;
}

export default function MobileMenu({ setSidebarOpen }: MobileMenuProps) {
    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    return (
        <Menu
            attached="top"
            className={headerStyles.header}
        >
            <HeaderLogo />
            {
                isNotAuth
                    ? <LoginButton />
                    : (
                        <Menu.Item
                            position="right"
                            header
                            className={styles.headerItem}
                        >
                            <Dropdown
                                item
                                simple
                                onClick={setSidebarOpen}
                                icon={(
                                    <Icon
                                        size="big"
                                        name="bars"
                                        className={styles.mobileDropdownIcon}
                                    />
                                )}
                                className={styles.mobileDropdown}
                            />
                        </Menu.Item>
                    )
            }
        </Menu>
    );
}
