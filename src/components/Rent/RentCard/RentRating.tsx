import { MouseEvent, useCallback, useState } from "react";

import { Rating, RatingProps } from "semantic-ui-react";

import { Rent } from "@models/rent/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { rateRentRequest } from "@store/rent/reducer";
import { selectIsRentRating } from "@store/rent/selectors";

import styles from "./styles/RentRating.module.scss";

interface RentRatingProps {
    rent: Rent;
}

export default function RentRating({ rent: { rating, ...rent } }: RentRatingProps) {
    const dispatch = useAppDispatch();

    const isRentRating = useAppSelector((state) => selectIsRentRating(state, rent.id));

    const [currentRating, setCurrentRating] = useState<number | undefined>(rating || 0);

    const onRatingChange = useCallback((_event: MouseEvent, { rating: newRating }: RatingProps) => {
        setCurrentRating(newRating as number);
    }, []);

    const rate = useCallback(
        () => dispatch(
            rateRentRequest({
                rentId: rent.id,
                rating: currentRating as number,
                placeName: rent.place.name
            })
        ),
        [currentRating, dispatch, rent.id, rent.place.name]
    );

    if (rating) {
        return (
            <div className={styles.container}>
                <Rating
                    maxRating={5}
                    disabled
                    rating={rating}
                    icon="star"
                    size="massive"
                />
            </div>
        );
    }

    return (
        <div className={styles.containerActive}>
            <h2>Оцените бронирование:</h2>
            <div className={styles.ratingContainer}>
                <Rating
                    className={styles.rating}
                    maxRating={5}
                    rating={currentRating}
                    onRate={onRatingChange}
                    icon="star"
                    size="massive"
                    disabled={isRentRating}
                    clearable
                />
                <PrimaryButton
                    className={styles.rateButton}
                    disabled={!currentRating || isRentRating}
                    loading={isRentRating}
                    onClick={rate}
                >
                    Оценить
                </PrimaryButton>
            </div>
        </div>
    );
}
