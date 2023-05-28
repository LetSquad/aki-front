import React, { forwardRef, useImperativeHandle } from "react";

import { Link, To } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";
import ConfirmationModal from "@parts/ConfirmationModal/ConfirmationModal";

import styles from "./styles/BlockIcons.module.scss";

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
    deleteConfirmationText?: string;
    deleteAction?: () => void;
    deleteIconName?: "trash" | "cancel" | "ban";
    additionalIcon?: (iconClassName: string) => React.JSX.Element
} & ({
    onEditClick?: () => void;
} | {
    editLink?: To;
});

export interface BlockIconsFormRef {
    closeModal: () => void;
}

const BlockIcons = forwardRef(({
    size = BlockIconsSize.LARGE,
    indent = BlockIconsIndent.MEDIUM,
    modalTitle,
    deleteAction,
    deleteConfirmationText,
    deleteIconName = "trash",
    additionalIcon,
    ...props
}: BlockIconsProps, ref: React.ForwardedRef<BlockIconsFormRef>) => {
    const [isConfirmationOpen,, openConfirmation, closeConfirmation] = useToggle();

    useImperativeHandle(ref, () => ({
        closeModal: closeConfirmation
    }), [closeConfirmation]);

    return (
        <>
            {deleteAction && deleteConfirmationText && isConfirmationOpen && (
                <ConfirmationModal
                    title={modalTitle}
                    cancelAction={() => closeConfirmation()}
                    deleteAction={deleteAction}
                    deleteConfirmationText={deleteConfirmationText}
                />
            )}
            <div className={styles[`iconContainer${indent?.toUpperCase()}`]}>
                {!!additionalIcon && additionalIcon(styles[`icon${size?.toUpperCase()}`])}
                {"editLink" in props && props.editLink && (
                    <Link to={props.editLink}>
                        <Icon
                            className={styles[`icon${size?.toUpperCase()}`]}
                            name="edit"
                            link
                        />
                    </Link>
                )}
                {"onEditClick" in props && props.onEditClick && (
                    <Icon
                        className={styles[`icon${size?.toUpperCase()}`]}
                        name="edit"
                        link
                        onClick={props.onEditClick}
                    />
                )}
                {deleteAction && (
                    <Icon
                        className={styles[`icon${size?.toUpperCase()}`]}
                        name={deleteIconName}
                        link
                        disabled={isConfirmationOpen}
                        onClick={() => (deleteConfirmationText ? openConfirmation() : deleteAction())}
                    />
                )}
            </div>
        </>
    );
});

export default BlockIcons;
