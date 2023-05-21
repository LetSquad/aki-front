import { BasePageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const CommonPagesData: PageData = {
    USER: {
        name: "Пользователь",
        slug: BasePageSlugs.USER
    },
    MY_PROFILE: {
        name: "Профиль",
        slug: BasePageSlugs.MY_PROFILE
    },
    AREA: {
        name: "Площадка",
        slug: BasePageSlugs.AREA
    }
};
