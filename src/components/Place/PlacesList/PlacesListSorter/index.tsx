import { useCallback } from "react";

import classNames from "classnames";
import { Icon, Segment } from "semantic-ui-react";

import { PlacesSortDirection, PlacesSortType } from "@models/places/enums";

import styles from "./styles/PlacesListSorter.module.scss";

interface PlacesListSorterProps {
    sort: [PlacesSortType, PlacesSortDirection];
    onSortChanged: (sort: [PlacesSortType, PlacesSortDirection]) => void;
    disabled: boolean;
}

export default function PlacesListSorter({ sort, onSortChanged, disabled }: PlacesListSorterProps) {
    const onClickPersonalSort = useCallback(() => {
        onSortChanged([PlacesSortType.PERSONAL, PlacesSortDirection.DESC]);
    }, [onSortChanged]);

    const onClickPopularSort = useCallback(() => {
        onSortChanged([PlacesSortType.POPULAR, PlacesSortDirection.DESC]);
    }, [onSortChanged]);

    const onClickRatingSort = useCallback(() => {
        onSortChanged([PlacesSortType.RATING, PlacesSortDirection.DESC]);
    }, [onSortChanged]);

    const onClickPriceSort = useCallback(() => {
        if (sort[0] === PlacesSortType.PRICE && sort[1] === PlacesSortDirection.ASC) {
            onSortChanged([PlacesSortType.PRICE, PlacesSortDirection.DESC]);
        } else {
            onSortChanged([PlacesSortType.PRICE, PlacesSortDirection.ASC]);
        }
    }, [onSortChanged, sort]);

    return (
        <Segment className={styles.segment}>
            <div className={styles.container}>
                <span
                    className={
                        classNames({
                            [styles.itemActive]: sort[0] !== PlacesSortType.PERSONAL
                        })
                    }
                    aria-hidden
                    onClick={sort[0] === PlacesSortType.PERSONAL || disabled ? undefined : onClickPersonalSort}
                >
                    Персональная подборка
                </span>
                <span
                    className={
                        classNames({
                            [styles.itemActive]: sort[0] !== PlacesSortType.POPULAR
                        })
                    }
                    aria-hidden
                    onClick={sort[0] === PlacesSortType.POPULAR || disabled ? undefined : onClickPopularSort}
                >
                    По популярности
                </span>
                <span
                    className={
                        classNames({
                            [styles.itemActive]: sort[0] !== PlacesSortType.RATING
                        })
                    }
                    aria-hidden
                    onClick={sort[0] === PlacesSortType.RATING || disabled ? undefined : onClickRatingSort}
                >
                    По рейтингу
                </span>
                <div className={styles.priceContainer}>
                    <span
                        className={
                            classNames({
                                [styles.itemActive]: sort[0] !== PlacesSortType.PRICE,
                                [styles.itemSelectedActive]: sort[0] === PlacesSortType.PRICE
                            })
                        }
                        aria-hidden
                        onClick={disabled ? undefined : onClickPriceSort}
                    >
                        По цене
                    </span>
                    {sort[0] === PlacesSortType.PRICE && (
                        <Icon name={sort[1] === PlacesSortDirection.DESC ? "sort amount down" : "sort amount up"} />
                    )}
                </div>
            </div>
        </Segment>
    );
}
