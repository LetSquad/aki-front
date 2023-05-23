import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { PlaceEquipment } from "@models/places/types";
import Price from "@parts/Price";

import basePlaceStyles from "../styles/PlaceInfoDetails.module.scss";

interface PlaceEquipmentsViewProps {
    equipments: PlaceEquipment[];
}

export default function PlaceEquipmentsView({ equipments }: PlaceEquipmentsViewProps) {
    const equipmentItems = useMemo(
        () => equipments.map((equipment) => (
            <div
                className={basePlaceStyles.itemContainer}
                key={equipment.name}
            >
                <div>
                    <span className={basePlaceStyles.item}>{equipment.name}</span>
                    {equipment.count && <span className={basePlaceStyles.itemsCount}>{`${equipment.count} шт.`}</span>}
                </div>
                <Price price={equipment.price} />
            </div>
        )),
        [equipments]
    );

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>Оборудование</span>
            <div className={basePlaceStyles.itemsContainer}>
                {equipmentItems}
            </div>
        </Segment>
    );
}
