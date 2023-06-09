import { RenterPageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const RenterPagesData: PageData = {
    MY_RENTS: {
        name: "Мои площадки",
        slug: RenterPageSlugs.MY_RENTS
    },
    FAVORITE_PLACES: {
        name: "Избранные площадки",
        slug: RenterPageSlugs.FAVORITE_PLACES
    }
};
