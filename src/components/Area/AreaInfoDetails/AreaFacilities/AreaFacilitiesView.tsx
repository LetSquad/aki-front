import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { AreaFacilities } from "@models/areas/types";

import baseAreaStyles from "../styles/AreaInfoDetails.module.scss";

interface AreaFacilitiesViewProps {
    facilities: AreaFacilities[];
}

export default function AreaFacilitiesView({ facilities }: AreaFacilitiesViewProps) {
    const facilitiesItems = useMemo(
        () => facilities.map((facility) => (
            <div
                className={baseAreaStyles.itemContainer}
                key={facility.name}
            >
                <div>
                    <span className={baseAreaStyles.item}>{facility.name}</span>
                    {facility.count && <span className={baseAreaStyles.itemsCount}>{`${facility.count} шт.`}</span>}
                </div>
            </div>
        )),
        [facilities]
    );

    return (
        <Segment>
            <span className={baseAreaStyles.secondaryTitle}>Удобства</span>
            <div className={baseAreaStyles.itemsContainer}>
                {facilitiesItems}
            </div>
        </Segment>
    );
}
