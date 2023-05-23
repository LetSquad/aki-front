import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { PlaceFacilities } from "@models/places/types";

import basePlaceStyles from "../styles/PlaceInfoDetails.module.scss";

interface PlaceFacilitiesViewProps {
    facilities: PlaceFacilities[];
}

export default function PlaceFacilitiesView({ facilities }: PlaceFacilitiesViewProps) {
    const facilitiesItems = useMemo(
        () => facilities.map((facility) => (
            <div
                className={basePlaceStyles.itemContainer}
                key={facility.name}
            >
                <div>
                    <span className={basePlaceStyles.item}>{facility.name}</span>
                    {facility.count && <span className={basePlaceStyles.itemsCount}>{`${facility.count} шт.`}</span>}
                </div>
            </div>
        )),
        [facilities]
    );

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>Удобства</span>
            <div className={basePlaceStyles.itemsContainer}>
                {facilitiesItems}
            </div>
        </Segment>
    );
}
