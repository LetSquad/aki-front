import AdditionalInfoItem from "@components/Area/AreaInfoDetails/AreaMainInfo/AdditionalInfoItem";
import { getCapacityTitleFromNumbers } from "@components/Area/utils/utils";
import { Area } from "@models/areas/types";
import freeSquareIcon from "@static/images/freeSquare.svg";
import fullSquareIcon from "@static/images/fullSquare.svg";
import notParkingIcon from "@static/images/notParking.svg";
import parkingIcon from "@static/images/parking.svg";
import capacityIcon from "@static/images/peoples.svg";
import numberOfStoreysIcon from "@static/images/stairs.svg";

import styles from "./styles/AdditionalInfo.module.scss";

interface AdditionalInfoProps {
    currentArea: Area;
}

export default function AdditionalInfo({ currentArea }: AdditionalInfoProps) {
    return (
        <div className={styles.container}>
            {currentArea.fullSquare && (
                <AdditionalInfoItem
                    icon={fullSquareIcon}
                    alt="Общая площадь"
                    data={`${currentArea.fullSquare} м²`}
                />
            )}
            {currentArea.fullSquare && (
                <AdditionalInfoItem
                    icon={freeSquareIcon}
                    alt="Доступная площадь"
                    data={`${currentArea.freeSquare} м²`}
                />
            )}
            {(currentArea.minCapacity || currentArea.maxCapacity) && (
                <AdditionalInfoItem
                    icon={capacityIcon}
                    alt="Вместимость"
                    data={getCapacityTitleFromNumbers(currentArea.minCapacity, currentArea.maxCapacity)}
                />
            )}
            {(currentArea.numberOfStoreys) && (
                <AdditionalInfoItem
                    icon={numberOfStoreysIcon}
                    alt="Этажность"
                    data={`${currentArea.numberOfStoreys} этаж`}
                />
            )}
            {currentArea.parking && (
                <AdditionalInfoItem
                    icon={parkingIcon}
                    alt="Парковка"
                    data="Есть парковка"
                />
            )}
            {!currentArea.parking && (
                <AdditionalInfoItem
                    icon={notParkingIcon}
                    alt="Парковка"
                    data="Парковка отсутствует"
                />
            )}
        </div>
    );
}
