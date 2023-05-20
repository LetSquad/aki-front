import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { Menu, Sidebar } from "semantic-ui-react";

import AppContent from "@components/App/AppContent";
import { useLogout } from "@hooks/useLogout";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { useToggle } from "@hooks/useToogle";
import { BasePageSlugs } from "@models/pages/enums";
import ImageWithLoading from "@parts/ImageWithLoading/ImageWithLoading";
import nullUserAvatar from "@static/images/nullUserAvatar.png";
import { useAppSelector } from "@store/hooks";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/SidebarMenu.module.scss";

export default function SidebarMenu() {
    const navigate = useNavigate();

    const user = useAppSelector(selectCurrentUser);

    const [isSidebarOpen, , openSidebar, closeSidebar] = useToggle();

    const menuOptions = useMenuOptions(closeSidebar);

    const logout = useLogout();

    const onProfileClick = useCallback(() => {
        navigate(BasePageSlugs.MY_PROFILE);
        closeSidebar();
    }, [navigate, closeSidebar]);

    const onLogoutClick = useCallback(() => {
        closeSidebar();
        logout();
    }, [logout, closeSidebar]);

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible={isSidebarOpen}
                direction="left"
                className={styles.sidebar}
            >
                <ImageWithLoading
                    circular
                    onClick={onProfileClick}
                    src={user?.userImage || nullUserAvatar}
                    className={styles.image}
                />
                <div className={styles.itemsContainer}>
                    {menuOptions}
                    <div
                        aria-hidden
                        className={styles.exitItem}
                        onClick={onLogoutClick}
                    >
                        Выйти
                    </div>
                </div>
            </Sidebar>
            <Sidebar.Pusher
                dimmed={isSidebarOpen}
                onClick={closeSidebar}
                className={styles.pusher}
            >
                <AppContent openSidebar={openSidebar} />
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}
