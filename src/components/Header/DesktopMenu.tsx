import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

import HeaderLogo from "@components/Header/HeaderLogo";
import LoginButton from "@components/Header/LoginButton";
import { useLogout } from "@hooks/useLogout";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { BasePageSlugs } from "@models/pages/enums";
import ImageWithLoading from "@parts/ImageWithLoading/ImageWithLoading";
import nullUserAvatar from "@static/images/nullUserAvatar.png";
import { useAppSelector } from "@store/hooks";
import { selectIsUserNotAuth } from "@store/info/selectors";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/DesktopMenu.module.scss";
import headerStyles from "./styles/Header.module.scss";

export default function DesktopMenu() {
    const user = useAppSelector(selectCurrentUser);
    const isNotAuth = useAppSelector(selectIsUserNotAuth);

    const menuOptions = useMenuOptions();

    const onLogoutButtonClicked = useLogout();

    return (
        <div>
            <Menu
                attached="top"
                className={headerStyles.header}
            >
                <HeaderLogo />
                <div className={styles.itemsContainer}>
                    {menuOptions}
                </div>
                {
                    isNotAuth
                        ? <LoginButton />
                        : (
                            <Menu.Menu position="right">
                                <Dropdown
                                    item
                                    simple
                                    icon={(
                                        <ImageWithLoading
                                            className={headerStyles.headerProfileImage}
                                            src={user?.userImage || nullUserAvatar}
                                            circular
                                        />
                                    )}
                                >
                                    <Dropdown.Menu className={headerStyles.headerProfileMenu}>
                                        <Link to={BasePageSlugs.MY_PROFILE}>
                                            <Dropdown.Item className={headerStyles.headerProfileLink}>Профиль</Dropdown.Item>
                                        </Link>
                                        <div>
                                            <Dropdown.Item
                                                onClick={onLogoutButtonClicked}
                                                className={headerStyles.headerProfileLink}
                                            >
                                                Выйти
                                            </Dropdown.Item>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        )
                }
            </Menu>
        </div>
    );
}
