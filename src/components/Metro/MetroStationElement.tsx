import classNames from "classnames";

import { getMetroLineLogoByEnum, getMetroLinesByMetroStation, getMetroStationTitleFromEnum } from "@components/Metro/utils/utils";
import { MetroStation } from "@models/metro/enums";

import styles from "./styles/MetroStationElement.module.scss";

interface MetroStationProps {
    station: MetroStation;
    color?: "dark" | "primary";
}

export default function MetroStationElement({ station, color = "primary" }: MetroStationProps) {
    return (
        <div className={styles.container}>
            {getMetroLinesByMetroStation(station).map((metroLine) => (
                <img
                    key={`${station}_${metroLine}`}
                    src={getMetroLineLogoByEnum(metroLine)}
                    alt={metroLine}
                    className={styles.lineLogo}
                />
            ))}
            <span className={classNames(styles.station, { [styles.stationDark]: color === "dark" })}>{getMetroStationTitleFromEnum(station)}</span>
        </div>
    );
}
