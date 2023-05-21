import React, {
    lazy,
    useCallback,
    useMemo,
    useState
} from "react";

import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { getFullName } from "@coreUtils/utils";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { useEditFlipCardAdditionalColumnsWidth } from "@hooks/useEditFlipCardAdditionalColumnsWidth";
import { useEditFlipCardBaseColumnsWidth } from "@hooks/useEditFlipCardBaseColumnsWidth";
import { BaseUserFieldsName, LandlordBaseUserFieldsName, UserRole } from "@models/users/enums";
import { LandlordInfo, User } from "@models/users/types";
import BlockIcons from "@parts/BlockIcons/BlockIcons";
import ImageWithLoading from "@parts/ImageWithLoading/ImageWithLoading";
import nullUserAvatar from "@static/images/nullUserAvatar.png";

import styles from "./styles/UserInfoDetails.module.scss";

const UserDetailForm = lazy(/* webpackChunkName: "AppointmentDetailForm" */ () => import("./UserDetailForm/UserDetailForm"));

const CardGrid = lazy(/* webpackChunkName: "CardGrid" */ () => import("@parts/CardParts/CardGrid"));

const CardRow = lazy(/* webpackChunkName: "CardRow" */ () => import("@parts/CardParts/CardRow"));

interface UserInfoDetailsProps {
    user: User;
    editable?: boolean;
}

export default function UserInfoDetails({ user, editable = false }: UserInfoDetailsProps) {
    const [searchParams] = useSearchParams();

    const changeEditParam = useChangeEditSearchParam();

    const [isEditUser, setIsEditUser] = useState((!!searchParams.get("edit") && editable) || false);

    const baseColumnsWidth = useEditFlipCardBaseColumnsWidth();
    const additionalColumnsWidth = useEditFlipCardAdditionalColumnsWidth();

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

    const additionalRows = useMemo(() => {
        if (user.userRole === UserRole.LANDLORD) {
            return landlordRows(user);
        }
        return [];
    }, [landlordRows, user]);

    const userContent = useMemo(() => {
        const {
            firstName,
            middleName,
            lastName,
            userImage
        } = user;

        return (
            <div className={flipEditCardPartsStyles.info}>
                {editable && <BlockIcons onEditClick={() => changeEditState(!isEditUser)} />}
                <div className={styles.contentContainer}>
                    <ImageWithLoading
                        circular
                        className={styles.image}
                        src={userImage || nullUserAvatar}
                    />
                    <div className={styles.content}>
                        <h1 className={styles.contentFullName}>{getFullName(firstName, middleName, lastName)}</h1>
                        <div className={styles.gridContainer}>
                            <WithSuspense>
                                <CardGrid position="top">{baseRows}</CardGrid>
                            </WithSuspense>
                        </div>
                    </div>
                </div>
                <WithSuspense>
                    <CardGrid position="bottom">{additionalRows}</CardGrid>
                </WithSuspense>
            </div>
        );
    }, [user, editable, baseRows, additionalRows, changeEditState, isEditUser]);

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
