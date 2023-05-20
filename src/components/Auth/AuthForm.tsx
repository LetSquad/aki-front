import { useMemo, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { Modal } from "semantic-ui-react";

import { AuthContext } from "@components/Auth/AuthContext";
import AuthFormDesktop from "@components/Auth/AuthFormDesktop";
import AuthFormMobile from "@components/Auth/AuthFormMobile";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import { useToggle } from "@hooks/useToogle";
import { SignInFieldName } from "@models/auth/enums";
import { SignInFormValues } from "@models/auth/types";

import styles from "./styles/AuthForm.module.scss";

interface AuthFormProps {
    onClose?: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
    const [isSignIn,, setSignIn, setSignUp] = useToggle(true);

    const [loginData, setLoginData] = useState<SignInFormValues>({ [SignInFieldName.EMAIL]: "", [SignInFieldName.PASSWORD]: "" });

    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const modalStyles = useMemo(() => {
        if (isMobile) {
            return isSignIn ? styles.modal : styles.modalSignUp;
        }

        return styles.modal;
    }, [isMobile, isSignIn]);

    const containerStyles = useMemo(() => {
        if (isMobile) {
            return isSignIn ? styles.authSignIn : styles.authSignUp;
        }

        return styles.auth;
    }, [isMobile, isSignIn]);

    const contextValue = useMemo(
        () => ({
            isSignIn,
            setSignIn,
            setSignUp,
            loginData,
            setEmail: (email: string) => setLoginData({ ...loginData, email }),
            setPassword: (password: string) => setLoginData({ ...loginData, password })
        }),
        [isSignIn, loginData, setSignIn, setSignUp]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            <Modal
                open
                onClose={onClose}
                closeOnDimmerClick={!!onClose}
                closeOnEscape={!!onClose}
                closeIcon={!!onClose}
                className={modalStyles}
            >
                <div className={containerStyles}>{isMobile ? <AuthFormMobile /> : <AuthFormDesktop />}</div>
            </Modal>
        </AuthContext.Provider>
    );
}
