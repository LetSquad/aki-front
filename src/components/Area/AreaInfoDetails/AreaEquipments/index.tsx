import { useCurrentArea } from "@components/Area/AreaInfoDetails/AreaInfoContext";

import AreaEquipmentsView from "./AreaEquipmentsView";

export default function AreaEquipments() {
    const areaEquipments = useCurrentArea().equipments;

    if (areaEquipments === undefined || areaEquipments.length === 0) {
        return null;
    }

    return <AreaEquipmentsView equipments={areaEquipments} />;
}
