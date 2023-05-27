import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";

import PlaceServicesView from "./PlaceServicesView";

export default function PlaceServices() {
    const placeServices = useCurrentPlace().services;

    if (!placeServices || placeServices.length === 0) {
        return null;
    }

    return <PlaceServicesView services={placeServices} />;
}
