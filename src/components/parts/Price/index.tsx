import { getPriceTypeTitleFromEnum } from "@components/Place/utils/utils";
import { PriceType } from "@models/places/enums";
import { PlacePrice } from "@models/places/types";

import styles from "./styles/Price.module.scss";

interface PriceProps {
    price: PlacePrice;
}

export default function Price({ price }: PriceProps) {
    if (price.priceType === PriceType.FREE) {
        return <span className={styles.itemFree}>{getPriceTypeTitleFromEnum(price.priceType)}</span>;
    }

    return (
        <span className={styles.itemCost}>{`${price.price}${getPriceTypeTitleFromEnum(price.priceType)}`}</span>
    );
}
