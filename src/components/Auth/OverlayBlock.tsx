import { useIsSignIn, useSetSignIn, useSetSignUp } from "@components/Auth/AuthContext";
import PrimaryButton from "@parts/Buttons/PrimaryButton";

import styles from "./styles/OverlayBlock.module.scss";

export default function OverlayBlock() {
    const isSignIn = useIsSignIn();
    const setSignIn = useSetSignIn();
    const setSignUp = useSetSignUp();

    return (
        <div className={isSignIn ? styles.overlayContainer : styles.overlayContainerRight}>
            <div className={isSignIn ? styles.overlay : styles.overlayRight}>
                <div className={isSignIn ? styles.overlayPanelLeftActive : styles.overlayPanelLeft}>
                    <h2>Уже зарегистрированы?</h2>
                    <p>Просто войдите в свой аккаунт</p>
                    <PrimaryButton onClick={() => setSignIn()}>
                        Вход
                    </PrimaryButton>
                </div>
                <div className={isSignIn ? styles.overlayPanelRightActive : styles.overlayPanelRight}>
                    <h2>Впервые здесь?</h2>
                    <p>Начните работать с нашим сервисом после регистрации</p>
                    <PrimaryButton onClick={() => setSignUp()}>
                        Регистрация
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
