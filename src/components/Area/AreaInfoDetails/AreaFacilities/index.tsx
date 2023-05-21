import { useCurrentArea } from "@components/Area/AreaInfoDetails/AreaInfoContext";

import AreaFacilitiesView from "./AreaFacilitiesView";

export default function AreaFacilities() {
    const areaFacilities = useCurrentArea().facilities;

    if (areaFacilities === undefined || areaFacilities.length === 0) {
        return null;
    }

    return <AreaFacilitiesView facilities={areaFacilities} />;
}
