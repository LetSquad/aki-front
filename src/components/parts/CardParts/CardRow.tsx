import { Grid, SemanticWIDTHSNUMBER } from "semantic-ui-react";

import styles from "./styles/CardRow.module.scss";

interface CardRowProps {
    title: string;
    value: string | number | undefined;
    columnsWidth: [SemanticWIDTHSNUMBER, SemanticWIDTHSNUMBER];
}

export default function CardRow({ title, value, columnsWidth }: CardRowProps) {
    return value
        ? (
            <Grid.Row className={styles.row}>
                <Grid.Column
                    width={columnsWidth[0]}
                    className={styles.rowTitle}
                >
                    {title}
                </Grid.Column>
                <Grid.Column
                    width={columnsWidth[1]}
                    className={styles.rowContent}
                >
                    {value}
                </Grid.Column>
            </Grid.Row>
        )
        : null;
}
