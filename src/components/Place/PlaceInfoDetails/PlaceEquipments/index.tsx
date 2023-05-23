import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";

import PlaceEquipmentsView from "./PlaceEquipmentsView";

export default function PlaceEquipments() {
    const placeEquipments = useCurrentPlace().equipments;

    if (placeEquipments === undefined || placeEquipments.length === 0) {
        return null;
    }

    return <PlaceEquipmentsView equipments={placeEquipments} />;
}
