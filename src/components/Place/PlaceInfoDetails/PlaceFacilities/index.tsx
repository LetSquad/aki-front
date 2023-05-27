import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";

import PlaceFacilitiesView from "./PlaceFacilitiesView";

export default function PlaceFacilities() {
    const placeFacilities = useCurrentPlace().facilities;

    if (!placeFacilities || placeFacilities.length === 0) {
        return null;
    }

    return <PlaceFacilitiesView facilities={placeFacilities} />;
}
