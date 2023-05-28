import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { BasePageSlugs } from "@models/pages/enums";
import { useAppDispatch } from "@store/hooks";
import { setAuth, setRole } from "@store/info/reducer";
import { resetCurrentUser } from "@store/user/reducer";

export function useLogout() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return useCallback(() => {
        dispatch(setAuth(false));
        dispatch(setRole(undefined));
        dispatch(resetCurrentUser());
        localStorage.removeItem("aki_role");
        navigate(BasePageSlugs.DASHBOARD);
    }, [dispatch, navigate]);
}
