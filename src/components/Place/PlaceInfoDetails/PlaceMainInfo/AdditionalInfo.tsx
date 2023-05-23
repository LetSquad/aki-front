import AdditionalInfoItem from "@components/Place/PlaceInfoDetails/PlaceMainInfo/AdditionalInfoItem";
import { getCapacityTitleFromNumbers } from "@components/Place/utils/utils";
import { Place } from "@models/places/types";
import freeSquareIcon from "@static/images/freeSquare.svg";
import fullSquareIcon from "@static/images/fullSquare.svg";
import notParkingIcon from "@static/images/notParking.svg";
import parkingIcon from "@static/images/parking.svg";
import capacityIcon from "@static/images/peoples.svg";
import numberOfStoreysIcon from "@static/images/stairs.svg";

import styles from "./styles/AdditionalInfo.module.scss";

interface AdditionalInfoProps {
    currentPlace: Place;
}

export default function AdditionalInfo({ currentPlace }: AdditionalInfoProps) {
    return (
        <div className={styles.container}>
            {currentPlace.fullSquare && (
                <AdditionalInfoItem
                    icon={fullSquareIcon}
                    alt="Общая площадь"
                    data={`${currentPlace.fullSquare} м²`}
                />
            )}
            {currentPlace.fullSquare && (
                <AdditionalInfoItem
                    icon={freeSquareIcon}
                    alt="Доступная площадь"
                    data={`${currentPlace.freeSquare} м²`}
                />
            )}
            {(currentPlace.minCapacity || currentPlace.maxCapacity) && (
                <AdditionalInfoItem
                    icon={capacityIcon}
                    alt="Вместимость"
                    data={getCapacityTitleFromNumbers(currentPlace.minCapacity, currentPlace.maxCapacity)}
                />
            )}
            {(currentPlace.levelNumber) && (
                <AdditionalInfoItem
                    icon={numberOfStoreysIcon}
                    alt="Этажность"
                    data={`${currentPlace.levelNumber} этаж`}
                />
            )}
            {currentPlace.parking && (
                <AdditionalInfoItem
                    icon={parkingIcon}
                    alt="Парковка"
                    data="Есть парковка"
                />
            )}
            {!currentPlace.parking && (
                <AdditionalInfoItem
                    icon={notParkingIcon}
                    alt="Парковка"
                    data="Парковка отсутствует"
                />
            )}
        </div>
    );
}
