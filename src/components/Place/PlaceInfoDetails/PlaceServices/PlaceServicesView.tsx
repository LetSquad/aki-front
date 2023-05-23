import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { PlaceService } from "@models/places/types";
import Price from "@parts/Price";

import basePlaceStyles from "../styles/PlaceInfoDetails.module.scss";

interface PlaceServicesViewProps {
    services: PlaceService[];
}

export default function PlaceServicesView({ services }: PlaceServicesViewProps) {
    const serviceItems = useMemo(
        () => services.map((service) => (
            <div
                className={basePlaceStyles.itemContainer}
                key={service.name}
            >
                <span className={basePlaceStyles.item}>{service.name}</span>
                <Price price={service.price} />
            </div>
        )),
        [services]
    );

    return (
        <Segment>
            <span className={basePlaceStyles.secondaryTitle}>Услуги</span>
            <div className={basePlaceStyles.itemsContainer}>
                {serviceItems}
            </div>
        </Segment>
    );
}
