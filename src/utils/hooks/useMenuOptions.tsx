import { useCallback } from "react";

import classNames from "classnames";
import { Link } from "react-router-dom";

import { AdminItems, LandlordItems, RenterItems } from "@coreUtils/MenuItems";
import { useLocationActive } from "@hooks/useLocationActive";
import { UserRole } from "@models/users/enums";
import { useAppSelector } from "@store/hooks";
import { selectUserRole } from "@store/info/selectors";

import styles from "./styles/useMenuOptions.module.scss";

export function useMenuOptions(onClose?: () => void) {
    const role = useAppSelector(selectUserRole);

    const isLocationActive = useLocationActive();

    const getOptions = useCallback(
        (menuOptions: { name: string; url: string }[]) => menuOptions.map((option) => (
            <Link
                to={option.url}
                key={option.url}
                className={classNames(styles.item, { [styles.itemActive]: isLocationActive(option.url) })}
                onClick={() => {
                    if (onClose) {
                        onClose();
                    }
                }}
            >
                {option.name}
            </Link>
        )),
        [isLocationActive, onClose]
    );

    switch (role) {
        case UserRole.ADMIN: {
            return getOptions(AdminItems);
        }
        case UserRole.LANDLORD: {
            return getOptions(LandlordItems);
        }
        default: {
            return getOptions(RenterItems);
        }
    }
}
