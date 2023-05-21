import { createContext, useContext } from "react";

import { Area } from "@models/areas/types";

type AreaInfoContextType = {
    currentArea: Area;
    isAreaEdit: boolean;
};

export const AreaInfoContext = createContext<AreaInfoContextType | undefined>(undefined);

export function useCurrentArea() {
    const context = useContext(AreaInfoContext);
    if (!context) {
        throw new Error("useCurrentArea must be used within a AreaInfoProvider");
    }
    return context.currentArea;
}

export function useIsAreaEdit() {
    const context = useContext(AreaInfoContext);
    if (!context) {
        throw new Error("useIsAreaEdit must be used within a AreaInfoProvider");
    }
    return context.isAreaEdit;
}
