import { useMemo } from "react";

import { Segment } from "semantic-ui-react";

import { AreaService } from "@models/areas/types";
import Price from "@parts/Price";

import baseAreaStyles from "../styles/AreaInfoDetails.module.scss";

interface AreaServicesViewProps {
    services: AreaService[];
}

export default function AreaServicesView({ services }: AreaServicesViewProps) {
    const serviceItems = useMemo(
        () => services.map((service) => (
            <div
                className={baseAreaStyles.itemContainer}
                key={service.name}
            >
                <span className={baseAreaStyles.item}>{service.name}</span>
                <Price price={service.price} />
            </div>
        )),
        [services]
    );

    return (
        <Segment>
            <span className={baseAreaStyles.secondaryTitle}>Услуги</span>
            <div className={baseAreaStyles.itemsContainer}>
                {serviceItems}
            </div>
        </Segment>
    );
}
