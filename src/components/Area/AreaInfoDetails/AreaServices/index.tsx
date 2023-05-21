import { useCurrentArea } from "@components/Area/AreaInfoDetails/AreaInfoContext";

import AreaServicesView from "./AreaServicesView";

export default function AreaServices() {
    const areaServices = useCurrentArea().services;

    if (areaServices === undefined || areaServices.length === 0) {
        return null;
    }

    return <AreaServicesView services={areaServices} />;
}
