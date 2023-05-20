import { useCallback } from "react";

import { Menu } from "semantic-ui-react";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch } from "@store/hooks";
import { setIsLoginOpen } from "@store/info/reducer";

import styles from "./styles/LoginButton.module.scss";

export default function LoginButton() {
    const dispatch = useAppDispatch();

    const openLogin = useCallback(() => {
        dispatch(setIsLoginOpen(true));
    }, [dispatch]);

    return (
        <Menu.Item
            position="right"
            className={styles.buttonContainer}
        >
            <PrimaryButton
                className={styles.button}
                onClick={openLogin}
            >
                войти
            </PrimaryButton>
        </Menu.Item>
    );
}
