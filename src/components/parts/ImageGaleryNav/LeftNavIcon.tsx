import { MouseEvent, MouseEventHandler } from "react";
import * as React from "react";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import { onClickWithPrevent } from "@parts/ImageGaleryNav/utils/utils";

import styles from "./styles/NavIcons.module.scss";

interface LeftNavIconProps {
    onClick: MouseEventHandler<HTMLElement>;
    disabled: boolean
}

export default function LeftNavIcon({ onClick, disabled }: LeftNavIconProps) {
    return (
        <Icon
            name="chevron left"
            link
            size="huge"
            className={classNames(styles.icon, styles.iconNavLeft)}
            onClick={(event: MouseEvent<HTMLElement>) => onClickWithPrevent(event, onClick)}
            disabled={disabled}
        />
    );
}
