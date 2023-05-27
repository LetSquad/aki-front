import { Rating } from "semantic-ui-react";

import { PlaceRating as PlaceRatingType } from "@models/places/types";

import styles from "./styles/PlaceRating.module.scss";

interface PlaceRatingProps {
    rating?: PlaceRatingType | null
}

export default function PlaceRating({ rating }: PlaceRatingProps) {
    return rating
        ? (
            <div className={styles.ratingContainer}>
                <Rating
                    className={styles.rating}
                    defaultRating={rating.rate}
                    disabled
                    maxRating={5}
                    size="large"
                />
                <span className={styles.ratingCount}>{`на основе ${rating.rateCount} оценок`}</span>
            </div>
        )
        : null;
}
