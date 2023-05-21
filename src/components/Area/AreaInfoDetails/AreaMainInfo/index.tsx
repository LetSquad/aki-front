import { Segment } from "semantic-ui-react";

import { useCurrentArea } from "@components/Area/AreaInfoDetails/AreaInfoContext";
import AdditionalInfo from "@components/Area/AreaInfoDetails/AreaMainInfo/AdditionalInfo";

import styles from "./styles/AreaMainInfo.module.scss";

export default function AreaMainInfo() {
    const currentArea = useCurrentArea();

    return (
        <Segment>
            <div className={styles.description}>
                <span className={styles.descriptionTitle}>Описание площадки</span>
                <span className={styles.descriptionContent}>{currentArea.description}</span>
            </div>
            <AdditionalInfo currentArea={currentArea} />
            <div className={styles.contacts}>
                <span className={styles.contactsItem}>{currentArea.address}</span>
                <div className={styles.contactsLinks}>
                    <a
                        href={currentArea.site}
                        target="_blank"
                        className={styles.contactsLink}
                        rel="noreferrer"
                    >
                        {currentArea.site}
                    </a>
                    <a
                        href={`tel:${currentArea.phone}`}
                        className={styles.contactsLink}
                    >
                        {currentArea.phone}
                    </a>
                    <a
                        href={`mailto:${currentArea.email}`}
                        className={styles.contactsLink}
                    >
                        {currentArea.email}
                    </a>
                </div>
            </div>
        </Segment>
    );
}
