import { getPriceTypeTitleFromEnum } from "@components/Area/utils/utils";
import { PriceType } from "@models/areas/enums";
import { AreaPrice } from "@models/areas/types";

import styles from "./styles/Price.module.scss";

interface PriceProps {
    price: AreaPrice;
}

export default function Price({ price }: PriceProps) {
    if (price.priceType === PriceType.FREE) {
        return <span className={styles.itemFree}>{getPriceTypeTitleFromEnum(price.priceType)}</span>;
    }

    return (
        <span className={styles.itemCost}>{`${price.price}${getPriceTypeTitleFromEnum(price.priceType)}`}</span>
    );
}
