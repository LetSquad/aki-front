import { useCallback } from "react";

import { useAppDispatch } from "@store/hooks";
import { setAuth, setRole } from "@store/info/reducer";
import { resetCurrentUser } from "@store/user/reducer";

export function useLogout() {
    const dispatch = useAppDispatch();

    return useCallback(() => {
        dispatch(setAuth(false));
        dispatch(setRole(undefined));
        dispatch(resetCurrentUser());
        localStorage.removeItem("aki_role");
    }, [dispatch]);
}
