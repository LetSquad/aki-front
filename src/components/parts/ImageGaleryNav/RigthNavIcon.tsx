import { MouseEvent, MouseEventHandler } from "react";
import * as React from "react";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import { onClickWithPrevent } from "@parts/ImageGaleryNav/utils/utils";

import styles from "./styles/NavIcons.module.scss";

interface RightNavIconProps {
    onClick: MouseEventHandler<HTMLElement>;
    disabled: boolean
}

export default function RightNavIcon({ onClick, disabled }: RightNavIconProps) {
    return (
        <Icon
            name="chevron right"
            link
            size="huge"
            className={classNames(styles.icon, styles.iconNavRight)}
            onClick={(event: MouseEvent<HTMLElement>) => onClickWithPrevent(event, onClick)}
            disabled={disabled}
        />
    );
}
