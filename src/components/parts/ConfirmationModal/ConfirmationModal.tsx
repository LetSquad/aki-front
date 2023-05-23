import { Modal } from "semantic-ui-react";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

import styles from "./styles/ConfirmationModal.module.scss";

type ConfirmationModalProps = {
    title?: string;
    deleteConfirmationText: string;
    deleteAction: () => void;
    cancelAction: () => void;
};

export default function ConfirmationModal({
    deleteAction,
    deleteConfirmationText,
    cancelAction,
    title = "Подтверждение удаления"
}: ConfirmationModalProps) {
    return (
        <Modal
            open
            size="mini"
            className={styles.confirmation}
        >
            <Modal.Header className={styles.confirmationHeader}>{title}</Modal.Header>
            <Modal.Content className={styles.confirmationContent}>
                <p>{deleteConfirmationText}</p>
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
                    onClick={deleteAction}
                    color="negative"
                >
                    Да
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}
