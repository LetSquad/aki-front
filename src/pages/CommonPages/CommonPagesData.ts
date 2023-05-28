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
    PLACE: {
        name: "Площадка",
        slug: BasePageSlugs.PLACE
    },
    DASHBOARD: {
        name: "Каталог площадок",
        slug: BasePageSlugs.DASHBOARD
    }
};
