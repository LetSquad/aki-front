import { MouseEvent, MouseEventHandler } from "react";
import * as React from "react";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import { onClickWithPrevent } from "@parts/ImageGaleryNav/utils/utils";

import styles from "./styles/NavIcons.module.scss";

interface FullScreenIconProps {
    onClick: MouseEventHandler<HTMLElement>;
    isFullscreen: boolean
}

export default function FullScreenIcon({ onClick, isFullscreen }: FullScreenIconProps) {
    return (
        <Icon
            name={isFullscreen ? "compress" : "expand"}
            link
            size="big"
            className={classNames(styles.icon, styles.iconNavFullScreen)}
            onClick={(event: MouseEvent<HTMLElement>) => onClickWithPrevent(event, onClick)}
        />
    );
}
