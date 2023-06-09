import React, {
    lazy,
    useCallback,
    useMemo,
    useRef,
    useState
} from "react";

import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

import { getUserSpecializationTitleFromEnum } from "@components/Profile/utils/utils";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { getFullName } from "@coreUtils/utils";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { useEditFlipCardAdditionalColumnsWidth } from "@hooks/useEditFlipCardAdditionalColumnsWidth";
import { useEditFlipCardBaseColumnsWidth } from "@hooks/useEditFlipCardBaseColumnsWidth";
import {
    BaseUserFieldsName,
    LandlordBaseUserFieldsName,
    RenterBaseUserFieldsName,
    UserRole
} from "@models/users/enums";
import { LandlordInfo, RenterInfo, User } from "@models/users/types";
import AdminBlockIcons, { AdminBlockIconsFormRef } from "@parts/AdminBlockIcons/AdminBlockIcons";
import BlockIcons, { BlockIconsIndent } from "@parts/BlockIcons/BlockIcons";
import ImageWithLoading from "@parts/ImageWithLoading/ImageWithLoading";
import imagePlaceholder from "@static/images/imagePlaceholder.png";
import nullUserAvatar from "@static/images/nullUserAvatar.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { banUserRequest } from "@store/user/reducer";
import { selectCurrentUser, selectIsCurrentUserBanning } from "@store/user/selectors";

import styles from "./styles/UserInfoDetails.module.scss";

const UserDetailForm = lazy(/* webpackChunkName: "AppointmentDetailForm" */ () => import("./UserDetailForm/UserDetailForm"));

const CardGrid = lazy(/* webpackChunkName: "CardGrid" */ () => import("@parts/CardParts/CardGrid"));

const CardRow = lazy(/* webpackChunkName: "CardRow" */ () => import("@parts/CardParts/CardRow"));

interface UserInfoDetailsProps {
    user: User;
    editable?: boolean;
}

export default function UserInfoDetails({ user, editable = false }: UserInfoDetailsProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const changeEditParam = useChangeEditSearchParam();

    const adminBlockIconsRef = useRef<AdminBlockIconsFormRef>(null);

    const currentUser = useAppSelector(selectCurrentUser);
    const isCurrentUserBanning = useAppSelector((state) => selectIsCurrentUserBanning(state, user.id));

    const [isEditUser, setIsEditUser] = useState((!!searchParams.get("edit") && editable) || false);

    const baseColumnsWidth = useEditFlipCardBaseColumnsWidth();
    const additionalColumnsWidth = useEditFlipCardAdditionalColumnsWidth();

    const banPlace = useCallback(
        (userId: number, userName: string, banReason?: string) => {
            dispatch(banUserRequest({ userId, userName, banReason })).then(() => adminBlockIconsRef?.current?.closeModal());
        },
        [dispatch]
    );

    const changeEditState = useCallback(
        (state: boolean) => {
            setIsEditUser(state);
            changeEditParam(state);
        },
        [changeEditParam]
    );

    const baseRows = useMemo(() => {
        const { email, phone } = user;

        return [
            <CardRow
                key={BaseUserFieldsName.EMAIL}
                title="Электронная почта"
                value={email}
                columnsWidth={baseColumnsWidth}
            />,
            <CardRow
                key={BaseUserFieldsName.PHONE}
                title="Номер телефона"
                value={phone}
                columnsWidth={baseColumnsWidth}
            />
        ];
    }, [user, baseColumnsWidth]);

    const landlordRows = useCallback(
        ({ inn, jobTitle, organization }: LandlordInfo) => [
            (
                <CardRow
                    key={LandlordBaseUserFieldsName.INN}
                    title="ИНН"
                    value={inn}
                    columnsWidth={additionalColumnsWidth}
                />
            ),
            (
                <CardRow
                    key={LandlordBaseUserFieldsName.ORGANIZATION}
                    title="Юридическое лицо"
                    value={organization}
                    columnsWidth={additionalColumnsWidth}
                />
            ),
            (
                <CardRow
                    key={LandlordBaseUserFieldsName.JOB_TITLE}
                    title="Должность"
                    value={jobTitle}
                    columnsWidth={additionalColumnsWidth}
                />
            )
        ],
        [additionalColumnsWidth]
    );

    const renterRows = useCallback(
        ({ specializations }: RenterInfo) => (specializations && specializations.length > 0
            ? [
                <CardRow
                    key={RenterBaseUserFieldsName.SPECIALIZATIONS}
                    title="Род занятий"
                    value={
                        Object
                            .values(specializations)
                            .map((specialization) => (getUserSpecializationTitleFromEnum(specialization)))
                            .join(", ")
                    }
                    columnsWidth={additionalColumnsWidth}
                />
            ]
            : []),
        [additionalColumnsWidth]
    );

    const additionalRows = useMemo(() => {
        if (user.userRole === UserRole.LANDLORD) {
            return landlordRows(user);
        }
        if (user.userRole === UserRole.RENTER) {
            return renterRows(user);
        }

        return [];
    }, [landlordRows, renterRows, user]);

    const userContent = useMemo(() => {
        const {
            firstName,
            middleName,
            lastName,
            userImage,
            id,
            organizationLogo
        } = user;

        const userFullName = getFullName(firstName, middleName, lastName);

        return (
            <div className={flipEditCardPartsStyles.info}>
                {isCurrentUserBanning && (
                    <Dimmer
                        active
                        inverted
                    >
                        <Loader />
                    </Dimmer>
                )}
                {editable && (
                    <BlockIcons
                        indent={BlockIconsIndent.LARGE}
                        onEditClick={() => changeEditState(!isEditUser)}
                    />
                )}
                {currentUser?.userRole === UserRole.ADMIN && currentUser.id !== id && !currentUser.isBanned && (
                    <AdminBlockIcons
                        ref={adminBlockIconsRef}
                        indent={BlockIconsIndent.LARGE}
                        banAction={(reason) => banPlace(id, userFullName, reason)}
                        banConfirmationText={`Вы уверены, что хотите забанить пользователя "${userFullName}"?`}
                        modalTitle="Подтверждение бана"
                    />
                )}
                <div className={styles.contentContainer}>
                    <ImageWithLoading
                        circular
                        className={styles.image}
                        src={userImage || nullUserAvatar}
                    />
                    <div className={styles.content}>
                        <h1 className={styles.contentFullName}>{userFullName}</h1>
                        <div className={styles.gridContainer}>
                            <WithSuspense>
                                <CardGrid position="top">{baseRows}</CardGrid>
                            </WithSuspense>
                        </div>
                    </div>
                </div>
                <div className={styles.additionalContent}>
                    <WithSuspense>
                        <CardGrid position="bottom">{additionalRows}</CardGrid>
                    </WithSuspense>
                    {organizationLogo && (
                        <ImageWithLoading
                            className={styles.organizationLogo}
                            src={organizationLogo || imagePlaceholder}
                        />
                    )}
                </div>
            </div>
        );
    }, [
        user,
        isCurrentUserBanning,
        editable,
        currentUser,
        baseRows,
        additionalRows,
        changeEditState,
        isEditUser,
        banPlace
    ]);

    const editUserForm = useMemo(
        () => (
            <WithSuspense>
                <UserDetailForm
                    user={user}
                    onCancel={() => changeEditState(false)}
                    className={flipEditCardPartsStyles.editContent}
                />
            </WithSuspense>
        ),
        [changeEditState, user]
    );

    return (
        <Segment
            className={classNames({
                [styles.segmentContent]: !isEditUser,
                [styles.segmentEdit]: isEditUser
            })}
        >
            {isEditUser ? editUserForm : userContent}
        </Segment>
    );
}
