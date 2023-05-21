import { useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import AreaEquipments from "@components/Area/AreaInfoDetails/AreaEquipments";
import AreaFacilities from "@components/Area/AreaInfoDetails/AreaFacilities";
import AreaGallery from "@components/Area/AreaInfoDetails/AreaGallery";
import { AreaInfoContext } from "@components/Area/AreaInfoDetails/AreaInfoContext";
import AreaMainInfo from "@components/Area/AreaInfoDetails/AreaMainInfo";
import AreaServices from "@components/Area/AreaInfoDetails/AreaServices";
import { Area } from "@models/areas/types";

import styles from "./styles/AreaInfoDetails.module.scss";

interface AreaInfoDetailProps {
    currentArea: Area;
    isUserAreaOwner: boolean;
}

export default function AreaInfoDetails({ currentArea, isUserAreaOwner }: AreaInfoDetailProps) {
    const [searchParams] = useSearchParams();

    const [isAreaEdit, setIsAreaEdit] = useState((searchParams.get("edit") && isUserAreaOwner) || false);

    const contextValue = useMemo(
        () => ({
            currentArea,
            isAreaEdit
        }),
        [currentArea, isAreaEdit]
    );

    return (
        <AreaInfoContext.Provider value={contextValue}>
            <div>
                <span className={styles.title}>{currentArea.name}</span>
                <div className={styles.segmentsContainer}>
                    <AreaMainInfo />
                    <AreaFacilities />
                    <AreaServices />
                    <AreaEquipments />
                    <AreaGallery />
                </div>
            </div>
        </AreaInfoContext.Provider>
    );
}
