import React, {
    lazy,
    useCallback,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";

import PlaceEquipments from "@components/Place/PlaceInfoDetails/PlaceEquipments";
import PlaceFacilities from "@components/Place/PlaceInfoDetails/PlaceFacilities";
import PlaceGallery from "@components/Place/PlaceInfoDetails/PlaceGallery";
import { PlaceInfoContext } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";
import PlaceMainInfo from "@components/Place/PlaceInfoDetails/PlaceMainInfo";
import PlaceServices from "@components/Place/PlaceInfoDetails/PlaceServices";
import PlaceRating from "@components/Place/PlaceRating";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { LandLordPageSlugs } from "@models/pages/enums";
import { Place, PlaceAddFormValues } from "@models/places/types";
import BlockIcons, { BlockIconsIndent } from "@parts/BlockIcons/BlockIcons";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { deletePlaceRequest, updatePlaceRequest } from "@store/place/reducer";
import { selectIsUpdatingCurrentPlace } from "@store/place/selectors";

import styles from "./styles/PlaceInfoDetails.module.scss";

const PlaceDetailsForm = lazy(/* webpackChunkName: "PlaceDetailsForm" */ () => import("../PlaceDetailsForm"));

interface PlaceInfoDetailProps {
    currentPlace: Place;
    isUserPlaceOwner: boolean;
}

export default function PlaceInfoDetails({ currentPlace, isUserPlaceOwner }: PlaceInfoDetailProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const changeEditParam = useChangeEditSearchParam();

    const [isPlaceEdit, setIsPlaceEdit] = useState((searchParams.get("edit") && isUserPlaceOwner) || false);

    const isUpdatingCurrentPlace = useAppSelector(selectIsUpdatingCurrentPlace);

    const deletePlace = useCallback(
        (placeId: number, placeName: string) => {
            dispatch(deletePlaceRequest({ placeId, placeName })).then(() => navigate(LandLordPageSlugs.MY_PLACES));
        },
        [dispatch, navigate]
    );

    const changeEditState = useCallback(
        (state: boolean) => {
            setIsPlaceEdit(state);
            changeEditParam(state);
        },
        [changeEditParam]
    );

    const onSubmitButtonClicked = useCallback(
        (values: PlaceAddFormValues, _placeId: number) => {
            dispatch(updatePlaceRequest({ ...values, id: _placeId })).then((payload) => {
                if (payload.type === updatePlaceRequest.fulfilled.type) {
                    changeEditState(false);
                }
            });
        },
        [changeEditState, dispatch]
    );

    const contextValue = useMemo(
        () => ({ currentPlace }),
        [currentPlace]
    );

    return (
        <PlaceInfoContext.Provider value={contextValue}>
            <div
                className={
                    classNames({
                        [flipEditCardPartsStyles.segment]: !isPlaceEdit,
                        [flipEditCardPartsStyles.segmentEdit]: isPlaceEdit
                    })
                }
            >
                {
                    isPlaceEdit
                        ? (
                            <PlaceDetailsForm
                                initialValues={currentPlace}
                                onSubmit={(values: PlaceAddFormValues) => onSubmitButtonClicked(values, currentPlace.id)}
                                onCancel={() => changeEditState(false)}
                                isLoading={isUpdatingCurrentPlace}
                                className={flipEditCardPartsStyles.editContent}
                            />
                        )
                        : (
                            <div className={flipEditCardPartsStyles.info}>
                                <div className={styles.titleContainer}>
                                    {isUserPlaceOwner && (
                                        <BlockIcons
                                            indent={BlockIconsIndent.CENTER}
                                            onEditClick={() => changeEditState(true)}
                                            deleteAction={() => deletePlace(currentPlace.id, currentPlace.name)}
                                            deleteConfirmationText={`Удалить площадку "${currentPlace.name}"?`}
                                        />
                                    )}
                                    <span className={styles.title}>{currentPlace.name}</span>
                                    <PlaceRating rating={currentPlace.rating} />
                                </div>
                                <div className={styles.segmentsContainer}>
                                    <PlaceMainInfo />
                                    <PlaceFacilities />
                                    <PlaceServices />
                                    <PlaceEquipments />
                                    <PlaceGallery />
                                </div>
                            </div>
                        )
                }
            </div>
        </PlaceInfoContext.Provider>
    );
}
