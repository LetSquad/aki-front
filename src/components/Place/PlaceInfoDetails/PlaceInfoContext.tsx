import { createContext, useContext } from "react";

import { Place } from "@models/places/types";

type PlaceInfoContextType = {
    currentPlace: Place;
};

export const PlaceInfoContext = createContext<PlaceInfoContextType | undefined>(undefined);

export function useCurrentPlace() {
    const context = useContext(PlaceInfoContext);
    if (!context) {
        throw new Error("useCurrentPlace must be used within a PlaceInfoProvider");
    }
    return context.currentPlace;
}
