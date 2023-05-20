import { useIsSignIn } from "@components/Auth/AuthContext";

import SignInCard from "./SignIn/SignInCard";
import SignUpCard from "./SignUp/SignUpCard";

export default function AuthFormMobile() {
    const isSignIn = useIsSignIn();

    return isSignIn ? <SignInCard /> : <SignUpCard />;
}
