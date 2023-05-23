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
} & ({
    onEditClick?: () => void;
} | {
    editLink?: To;
});

export default function BlockIcons({
    size = BlockIconsSize.LARGE,
    indent = BlockIconsIndent.MEDIUM,
    modalTitle,
    deleteAction,
    deleteConfirmationText,
    deleteIconName = "trash",
    ...props
}: BlockIconsProps) {
    const [isConfirmationOpen,, openConfirmation, closeConfirmation] = useToggle();

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
                {"editLink" in props && props.editLink && (
                    <Link to={props.editLink}>
                        <Icon
                            className={styles.icon}
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
}
