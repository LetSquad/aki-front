import React from "react";

import classNames from "classnames";
import { Grid } from "semantic-ui-react";

import styles from "./styles/CardGrid.module.scss";

interface CardRowProps {
    position?: "top" | "middle" | "bottom";
    children: React.JSX.Element[];
}

export default function CardGrid({ position, children }: CardRowProps) {
    return children.length > 0
        ? (
            <Grid
                columns={2}
                className={classNames({
                    [styles.grid]: !position,
                    [styles.gridTop]: position === "top",
                    [styles.gridMiddle]: position === "middle",
                    [styles.gridBottom]: position === "bottom"
                })}
            >
                {children}
            </Grid>
        )
        : null;
}
