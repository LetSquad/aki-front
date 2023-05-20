import classNames from "classnames";
import { Button, ButtonProps } from "semantic-ui-react";

import styles from "./styles/PrimaryButton.module.scss";

export default function PrimaryButton({
    className, active, children, ...props
}: ButtonProps & { active?: boolean }) {
    return (
        <Button
            className={classNames(className, styles.button)}
            {...props}
        >
            <span>{children}</span>
        </Button>
    );
}
