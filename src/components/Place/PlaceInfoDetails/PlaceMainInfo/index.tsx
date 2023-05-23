import { Segment } from "semantic-ui-react";

import { useCurrentPlace } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";
import AdditionalInfo from "@components/Place/PlaceInfoDetails/PlaceMainInfo/AdditionalInfo";

import styles from "./styles/PlaceMainInfo.module.scss";

export default function PlaceMainInfo() {
    const currentPlace = useCurrentPlace();

    return (
        <Segment>
            <div className={styles.description}>
                <span className={styles.descriptionTitle}>Описание площадки</span>
                <span className={styles.descriptionContent}>{currentPlace.description}</span>
            </div>
            <AdditionalInfo currentPlace={currentPlace} />
            <div className={styles.contacts}>
                <span className={styles.contactsItem}>{currentPlace.address}</span>
                <div className={styles.contactsLinks}>
                    <a
                        href={currentPlace.site}
                        target="_blank"
                        className={styles.contactsLink}
                        rel="noreferrer"
                    >
                        {currentPlace.site}
                    </a>
                    <a
                        href={`tel:${currentPlace.phone}`}
                        className={styles.contactsLink}
                    >
                        {currentPlace.phone}
                    </a>
                    <a
                        href={`mailto:${currentPlace.email}`}
                        className={styles.contactsLink}
                    >
                        {currentPlace.email}
                    </a>
                </div>
            </div>
        </Segment>
    );
}
