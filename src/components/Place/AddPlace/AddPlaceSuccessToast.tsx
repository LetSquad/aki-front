import { useCallback } from "react";

import classNames from "classnames";
import { Toast, toast } from "react-hot-toast";
import { generatePath, useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import customSuccessToastStyles from "@coreStyles/customSuccessToast.module.scss";
import { BasePageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

interface AddPlaceSuccessToastProps {
    toast: Toast;
    createdPlaceId: number;
    createdPlaceName: string;
}

export default function AddPlaceSuccessToast({ toast: t, createdPlaceId, createdPlaceName }: AddPlaceSuccessToastProps) {
    const navigate = useNavigate();

    const goToHomePage = useCallback(() => navigate(BasePageSlugs.DASHBOARD), [navigate]);

    const goToPlacePage = useCallback(
        (placeId: number) => navigate(generatePath(BasePageSlugs.PLACE, { placeId: placeId.toString() })),
        [navigate]
    );

    return (
        <div
            className={classNames(
                {
                    [customSuccessToastStyles.successToastEnter]: t.visible,
                    [customSuccessToastStyles.successToastExit]: !t.visible
                },
                customSuccessToastStyles.successToast
            )}
        >
            <div className={customSuccessToastStyles.successToastContent}>
                <span className={customSuccessToastStyles.successToastText}>
                    {`Площадка ${createdPlaceName} успешно добавлена! Информация передана на проверку модератору и очень скоро она появится в списке площадок`}
                </span>
                <div className={customSuccessToastStyles.successToastButtonContainer}>
                    <SecondaryButton
                        className={customSuccessToastStyles.successToastButton}
                        onClick={() => {
                            goToHomePage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти на главную
                    </SecondaryButton>
                    <PrimaryButton
                        className={customSuccessToastStyles.successToastButton}
                        color="positive"
                        onClick={() => {
                            goToPlacePage(createdPlaceId);
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к карточке площадки
                    </PrimaryButton>
                </div>
            </div>
            <Icon
                name="remove"
                className={customSuccessToastStyles.toastDismissIcon}
                onClick={() => toast.dismiss(t.id)}
                link
            />
        </div>
    );
}
