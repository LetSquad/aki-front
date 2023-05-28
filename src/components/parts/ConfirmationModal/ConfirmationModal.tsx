import { ChangeEvent, useCallback, useState } from "react";

import { Input, Modal } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

import styles from "./styles/ConfirmationModal.module.scss";

type ConfirmationModalProps = {
    title?: string;
    deleteConfirmationText: string;
    deleteAction: (reason?: string) => void;
    cancelAction: () => void;
    withReasonInput?: boolean;
    reasonInputPlaceholder?: string;
};

export default function ConfirmationModal({
    deleteAction,
    deleteConfirmationText,
    cancelAction,
    title = "Подтверждение удаления",
    withReasonInput = false,
    reasonInputPlaceholder
}: ConfirmationModalProps) {
    const [reason, setReason] = useState<string>();

    const deleteWithReasonAction = useCallback(() => {
        if (withReasonInput) {
            deleteAction(reason);
        } else {
            deleteAction();
        }
    }, [deleteAction, reason, withReasonInput]);

    const onReasonChanged = useCallback((event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setReason(data.value);
    }, []);

    return (
        <Modal
            open
            size="mini"
            className={styles.confirmation}
        >
            <Modal.Header className={styles.confirmationHeader}>{title}</Modal.Header>
            <Modal.Content className={styles.confirmationContent}>
                <p>{deleteConfirmationText}</p>
                {withReasonInput && (
                    <Input
                        fluid
                        value={reason === undefined ? "" : reason}
                        placeholder={reasonInputPlaceholder}
                        onChange={onReasonChanged}
                    />
                )}
            </Modal.Content>
            <Modal.Actions className={styles.confirmationActions}>
                <SecondaryButton
                    className={styles.confirmationButton}
                    onClick={cancelAction}
                >
                    Отмена
                </SecondaryButton>
                <PrimaryButton
                    className={styles.confirmationButton}
                    onClick={deleteWithReasonAction}
                    color="negative"
                >
                    Да
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}
