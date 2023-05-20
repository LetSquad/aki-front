import { useIsSignIn } from "@components/Auth/AuthContext";

import OverlayBlock from "./OverlayBlock";
import SignInCard from "./SignIn/SignInCard";
import SignUpCard from "./SignUp/SignUpCard";

export default function AuthFormDesktop() {
    const isSignIn = useIsSignIn();

    return (
        <>
            {isSignIn ? <SignInCard /> : <SignUpCard />}
            <OverlayBlock />
        </>
    );
}
