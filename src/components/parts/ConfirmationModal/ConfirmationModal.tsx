import { Button, Modal } from "semantic-ui-react";

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
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <p>{deleteConfirmationText}</p>
            </Modal.Content>
            <Modal.Actions className={styles.confirmationActions}>
                <Button
                    className={styles.confirmationButton}
                    onClick={cancelAction}
                >
                    Отмена
                </Button>
                <Button
                    className={styles.confirmationButton}
                    onClick={deleteAction}
                    negative
                >
                    Да
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
