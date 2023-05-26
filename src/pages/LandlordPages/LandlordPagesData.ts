import { LandLordPageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const LandlordPagesData: PageData = {
    NEW_PLACE: {
        name: "Создать площадку",
        slug: LandLordPageSlugs.NEW_PLACE
    },
    MY_PLACES: {
        name: "Мои площадки",
        slug: LandLordPageSlugs.MY_PLACES
    },
    PLACE_SCHEDULE: {
        name: "Расписание площадки",
        slug: LandLordPageSlugs.PLACE_SCHEDULE
    }
};
