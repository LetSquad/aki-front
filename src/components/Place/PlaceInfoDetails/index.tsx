import React, {
    lazy,
    MouseEvent,
    useCallback,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import {
    generatePath,
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import { Icon } from "semantic-ui-react";

import PlaceEquipments from "@components/Place/PlaceInfoDetails/PlaceEquipments";
import PlaceFacilities from "@components/Place/PlaceInfoDetails/PlaceFacilities";
import PlaceGallery from "@components/Place/PlaceInfoDetails/PlaceGallery";
import { PlaceInfoContext } from "@components/Place/PlaceInfoDetails/PlaceInfoContext";
import PlaceMainInfo from "@components/Place/PlaceInfoDetails/PlaceMainInfo";
import PlaceServices from "@components/Place/PlaceInfoDetails/PlaceServices";
import PlaceRating from "@components/Place/PlaceRating";
import NewRentModal from "@components/Rent/NewRentModal";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { LandLordPageSlugs } from "@models/pages/enums";
import { Place, PlaceAddFormValues } from "@models/places/types";
import { UserRole } from "@models/users/enums";
import BlockIcons, { BlockIconsIndent } from "@parts/BlockIcons/BlockIcons";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { deletePlaceRequest, updatePlaceRequest } from "@store/place/reducer";
import { selectIsUpdatingCurrentPlace } from "@store/place/selectors";
import { setCurrentRentPlace } from "@store/rent/reducer";

import styles from "./styles/PlaceInfoDetails.module.scss";

const PlaceDetailsForm = lazy(/* webpackChunkName: "PlaceDetailsForm" */ () => import("../PlaceDetailsForm"));

interface PlaceInfoDetailProps {
    currentPlace: Place;
    isUserPlaceOwner: boolean;
    userRole?: UserRole;
}

export default function PlaceInfoDetails({ currentPlace, isUserPlaceOwner, userRole }: PlaceInfoDetailProps) {
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

    const onRentModalOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(setCurrentRentPlace(currentPlace));
    }, [currentPlace, dispatch]);

    const contextValue = useMemo(
        () => ({ currentPlace }),
        [currentPlace]
    );

    const scheduleIcon = useCallback((iconClassName: string) => (
        <Link to={generatePath(LandLordPageSlugs.PLACE_SCHEDULE, { placeId: currentPlace.id.toString() })}>
            <Icon
                className={iconClassName}
                name="calendar check outline"
                link
            />
        </Link>
    ), [currentPlace.id]);

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
                                <NewRentModal />
                                <div className={styles.head}>
                                    {isUserPlaceOwner && (
                                        <BlockIcons
                                            indent={BlockIconsIndent.CENTER}
                                            onEditClick={() => changeEditState(true)}
                                            deleteAction={() => deletePlace(currentPlace.id, currentPlace.name)}
                                            deleteConfirmationText={`Вы уверены, что хотите удалить площадку "${currentPlace.name}"?`}
                                            additionalIcon={scheduleIcon}
                                        />
                                    )}
                                    <div className={styles.titleContainer}>
                                        <span className={styles.title}>{currentPlace.name}</span>
                                        <PlaceRating rating={currentPlace.rating} />
                                    </div>
                                    {userRole === UserRole.RENTER && (
                                        <PrimaryButton
                                            className={styles.headRentButton}
                                            onClick={onRentModalOpen}
                                        >
                                            Забронировать
                                        </PrimaryButton>
                                    )}
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
