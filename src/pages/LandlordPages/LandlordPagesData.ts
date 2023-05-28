import { LandlordPageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const LandlordPagesData: PageData = {
    NEW_PLACE: {
        name: "Создать площадку",
        slug: LandlordPageSlugs.NEW_PLACE
    },
    MY_PLACES: {
        name: "Мои площадки",
        slug: LandlordPageSlugs.MY_PLACES
    },
    PLACE_SCHEDULE: {
        name: "Расписание площадки",
        slug: LandlordPageSlugs.PLACE_SCHEDULE
    }
};
