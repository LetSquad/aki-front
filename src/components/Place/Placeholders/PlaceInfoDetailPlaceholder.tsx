import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import { Placeholder, Segment } from "semantic-ui-react";

import placeInfoDetailsStyles from "../PlaceInfoDetails/styles/PlaceInfoDetails.module.scss";
import styles from "./styles/PlaceInfoDetailPlaceholder.module.scss";

export default function PlaceInfoDetailPlaceholder() {
    const isSmall = useMediaQuery({ maxWidth: 649 });

    return (
        <Segment
            className={placeInfoDetailsStyles.segmentContent}
            raised
        >
            <div className={placeInfoDetailsStyles.contentContainer}>
                <Placeholder className={classNames(placeInfoDetailsStyles.image, styles.imageContainer)}>
                    <Placeholder.Image className={styles.image} />
                </Placeholder>
                <Placeholder className={styles.content}>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length={isSmall ? "medium" : undefined} />
                        <Placeholder.Line length={isSmall ? "short" : undefined} />
                        <Placeholder.Line length={isSmall ? "medium" : undefined} />
                        <Placeholder.Line length={isSmall ? "very short" : undefined} />
                        <Placeholder.Line length={isSmall ? "short" : undefined} />
                        {isSmall && (
                            <>
                                <Placeholder.Line length="medium" />
                                <Placeholder.Line length="very short" />
                                <Placeholder.Line length="short" />
                                <Placeholder.Line length="very short" />
                                <Placeholder.Line length="medium" />
                            </>
                        )}
                    </Placeholder.Paragraph>
                </Placeholder>
            </div>
        </Segment>
    );
}
