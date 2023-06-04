import MetroStationElement from "@components/Metro/MetroStationElement";
import { MetroStation } from "@models/metro/enums";

import styles from "./styles/MetroStationList.module.scss";

interface MetroStationListProps {
    stations: MetroStation[]
}

export default function MetroStationList({ stations }: MetroStationListProps) {
    return (
        <div className={styles.container}>
            {stations.map((station) => (
                <MetroStationElement
                    key={station}
                    station={station}
                />
            ))}
        </div>
    );
}
