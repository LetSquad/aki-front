import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { AreaEquipment } from "@models/areas/types";
import Price from "@parts/Price";

import baseAreaStyles from "../styles/AreaInfoDetails.module.scss";

interface AreaEquipmentsViewProps {
    equipments: AreaEquipment[];
}

export default function AreaEquipmentsView({ equipments }: AreaEquipmentsViewProps) {
    const equipmentItems = useMemo(
        () => equipments.map((equipment) => (
            <div
                className={baseAreaStyles.itemContainer}
                key={equipment.name}
            >
                <div>
                    <span className={baseAreaStyles.item}>{equipment.name}</span>
                    {equipment.count && <span className={baseAreaStyles.itemsCount}>{`${equipment.count} шт.`}</span>}
                </div>
                <Price price={equipment.price} />
            </div>
        )),
        [equipments]
    );

    return (
        <Segment>
            <span className={baseAreaStyles.secondaryTitle}>Оборудование</span>
            <div className={baseAreaStyles.itemsContainer}>
                {equipmentItems}
            </div>
        </Segment>
    );
}
