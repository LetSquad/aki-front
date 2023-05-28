import { useMemo, useState } from "react";

import { useMediaQuery } from "react-responsive";
import { Dimmer, Loader } from "semantic-ui-react";

import { useIsSignIn } from "@components/Auth/AuthContext";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";

import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";
import styles from "./styles/SignInCard.module.scss";

export default function SignInCard() {
    const active = useIsSignIn();

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const content = useMemo(() => {
        if (forgetPassword) {
            return (
                <ResetPasswordForm
                    setForgotPassword={setForgetPassword}
                    setIsLoginLoading={setIsLoginLoading}
                />
            );
        }

        return (
            <SignInForm setIsLoginLoading={setIsLoginLoading} />
        );
    }, [forgetPassword]);

    const containerStyles = useMemo(() => {
        if (isMobile) {
            return styles.signInMobile;
        }

        return active ? styles.signIn : styles.signInInactive;
    }, [active, isMobile]);

    return (
        <div className={containerStyles}>
            {isLoginLoading && (
                <Dimmer
                    active
                    inverted
                >
                    <Loader />
                </Dimmer>
            )}
            {content}
        </div>
    );
}
