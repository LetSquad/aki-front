import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import { Placeholder, Segment } from "semantic-ui-react";

import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";

import userInfoDetailsStyles from "../styles/UserInfoDetails.module.scss";
import styles from "./styles/UserInfoDetailPlaceholder.module.scss";

export default function UserInfoDetailsPlaceholder() {
    const isSmall = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    return (
        <Segment
            className={userInfoDetailsStyles.segmentContent}
            raised
        >
            <div className={userInfoDetailsStyles.contentContainer}>
                <Placeholder className={classNames(userInfoDetailsStyles.image, styles.imageContainer)}>
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
