import { MouseEvent, useCallback } from "react";

import { Icon } from "semantic-ui-react";

import { Place } from "@models/places/types";
import { UserRole } from "@models/users/enums";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addFavoritePlaceRequest, removeFavoritePlaceRequest } from "@store/place/reducer";
import { selectIsPlaceFavorite } from "@store/place/selectors";
import { selectCurrentUser } from "@store/user/selectors";

import styles from "./styles/FavoritePlaceIcon.module.scss";

interface FavoritePlaceIconProps {
    place: Place;
}

function FavoritePlaceIconView({ place }: FavoritePlaceIconProps) {
    const dispatch = useAppDispatch();

    const { isFavorite, id } = place;

    const isPlaceFavorite = useAppSelector((state) => selectIsPlaceFavorite(state, id));

    const onCLick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isFavorite) {
            dispatch(removeFavoritePlaceRequest({ placeId: id }));
        } else {
            dispatch(addFavoritePlaceRequest({ placeId: id }));
        }
    }, [dispatch, id, isFavorite]);

    return (
        <Icon
            className={styles.icon}
            link
            disabled={isPlaceFavorite}
            name={isFavorite ? "heart" : "heart outline"}
            onClick={onCLick}
        />
    );
}

export default function FavoritePlaceIcon(props: FavoritePlaceIconProps) {
    const currentUser = useAppSelector(selectCurrentUser);

    if (currentUser?.userRole === UserRole.RENTER) {
        return <FavoritePlaceIconView {...props} />;
    }

    return null;
}
