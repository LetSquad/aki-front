import React from "react";

import { Icon } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";
import ConfirmationModal from "@parts/ConfirmationModal/ConfirmationModal";

import styles from "./styles/AdminBlockIcons.module.scss";

export enum BlockIconsSize {
    SMALL = "s",
    MEDIUM = "m",
    LARGE = "l"
}

export enum BlockIconsIndent {
    CENTER = "c",
    MEDIUM = "m",
    LARGE = "l"
}

type BlockIconsProps = {
    size?: BlockIconsSize;
    indent?: BlockIconsIndent;
    modalTitle?: string;
    banConfirmationText?: string;
    banAction?: (reason?: string) => void;
    approveAction?: () => void
};

export default function AdminBlockIcons({
    size = BlockIconsSize.LARGE,
    indent = BlockIconsIndent.MEDIUM,
    modalTitle,
    banAction,
    banConfirmationText,
    approveAction
}: BlockIconsProps) {
    const [isConfirmationOpen,, openConfirmation, closeConfirmation] = useToggle();

    return (
        <>
            {banAction && banConfirmationText && isConfirmationOpen && (
                <ConfirmationModal
                    title={modalTitle}
                    cancelAction={() => closeConfirmation()}
                    deleteAction={banAction}
                    deleteConfirmationText={banConfirmationText}
                    withReasonInput
                    reasonInputPlaceholder="Введите причину бана"
                />
            )}
            <div className={styles[`iconContainer${indent?.toUpperCase()}`]}>
                {approveAction && (
                    <Icon
                        className={styles[`icon${size?.toUpperCase()}`]}
                        name="check"
                        link
                        onClick={approveAction}
                    />
                )}
                {banAction && (
                    <Icon
                        className={styles[`icon${size?.toUpperCase()}`]}
                        name="ban"
                        link
                        disabled={isConfirmationOpen}
                        onClick={() => (banConfirmationText ? openConfirmation() : banAction())}
                    />
                )}
            </div>
        </>
    );
}
