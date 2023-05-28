import { MouseEvent, MouseEventHandler } from "react";
import * as React from "react";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import { onClickWithPrevent } from "@parts/ImageGaleryNav/utils/utils";

import styles from "./styles/NavIcons.module.scss";

interface FullScreenIconProps {
    onClick: MouseEventHandler<HTMLElement>;
    disabled: boolean
}

export default function FullScreenIcon({ onClick, disabled }: FullScreenIconProps) {
    return (
        <Icon
            name="expand arrows alternate"
            link
            size="big"
            className={classNames(styles.icon, styles.iconNavFullScreen)}
            onClick={(event: MouseEvent<HTMLElement>) => onClickWithPrevent(event, onClick)}
            disabled={disabled}
        />
    );
}
