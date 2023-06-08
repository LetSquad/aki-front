import { getCapacityTitleFromNumbers } from "@coreUtils/utils";
import { Place } from "@models/places/types";
import freeSquareIcon from "@static/images/freeSquare.svg";
import fullSquareIcon from "@static/images/fullSquare.svg";
import notParkingIcon from "@static/images/notParking.svg";
import parkingIcon from "@static/images/parking.svg";
import capacityIcon from "@static/images/peoples.svg";
import numberOfStoreysIcon from "@static/images/stairs.svg";

import PlaceAdditionalInfoItem from "./PlaceAdditionalInfoItem";
import styles from "./styles/PlaceAdditionalInfo.module.scss";

interface AdditionalInfoProps {
    currentPlace: Place;
}

export default function PlaceAdditionalInfo({ currentPlace }: AdditionalInfoProps) {
    return (
        <div className={styles.container}>
            {currentPlace.fullSquare && (
                <PlaceAdditionalInfoItem
                    icon={fullSquareIcon}
                    alt="Общая площадь"
                    data={`${currentPlace.fullSquare} м²`}
                />
            )}
            {currentPlace.freeSquare && (
                <PlaceAdditionalInfoItem
                    icon={freeSquareIcon}
                    alt="Доступная площадь"
                    data={`${currentPlace.freeSquare} м²`}
                />
            )}
            {(currentPlace.minCapacity || currentPlace.maxCapacity) && (
                <PlaceAdditionalInfoItem
                    icon={capacityIcon}
                    alt="Вместимость"
                    data={getCapacityTitleFromNumbers(currentPlace.minCapacity, currentPlace.maxCapacity)}
                />
            )}
            {(currentPlace.levelNumber) && (
                <PlaceAdditionalInfoItem
                    icon={numberOfStoreysIcon}
                    alt="Этаж размещения"
                    data={`${currentPlace.levelNumber} этаж`}
                />
            )}
            {currentPlace.parking && (
                <PlaceAdditionalInfoItem
                    icon={parkingIcon}
                    alt="Парковка"
                    data="Есть парковка"
                />
            )}
            {!currentPlace.parking && (
                <PlaceAdditionalInfoItem
                    icon={notParkingIcon}
                    alt="Парковка"
                    data="Парковка отсутствует"
                />
            )}
        </div>
    );
}
