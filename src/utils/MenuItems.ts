import {
    AdminPageSlugs,
    BasePageSlugs,
    LandlordPageSlugs,
    RenterPageSlugs
} from "@models/pages/enums";

export const CommonItems: { name: string, url: string }[] = [
    {
        name: "Каталог площадок",
        url: BasePageSlugs.DASHBOARD
    }
];

export const RenterItems: { name: string, url: string }[] = [
    ...CommonItems,
    {
        name: "Мои бронирования",
        url: RenterPageSlugs.MY_RENTS
    }, {
        name: "Избранные площадки",
        url: RenterPageSlugs.FAVORITE_PLACES
    }
];

export const LandlordItems: { name: string, url: string }[] = [
    ...CommonItems,
    {
        name: "Создать площадку",
        url: LandlordPageSlugs.NEW_PLACE
    }, {
        name: "Мои площадки",
        url: LandlordPageSlugs.MY_PLACES
    }
];

export const AdminItems: { name: string, url: string }[] = [
    ...CommonItems,
    {
        name: "Неопубликованные площадки",
        url: AdminPageSlugs.UNVERIFIED_PLACES
    }
];
