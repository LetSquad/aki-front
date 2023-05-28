import { MouseEvent, MouseEventHandler } from "react";

export function onClickWithPrevent(event: MouseEvent<HTMLElement>, onClick: MouseEventHandler<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    onClick(event);
}
