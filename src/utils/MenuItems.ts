import { BasePageSlugs, LandLordPageSlugs, RenterPageSlugs } from "@models/pages/enums";

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
    }
];

export const LandlordItems: { name: string, url: string }[] = [
    ...CommonItems,
    {
        name: "Создать площадку",
        url: LandLordPageSlugs.NEW_PLACE
    }, {
        name: "Мои площадки",
        url: LandLordPageSlugs.MY_PLACES
    }
];

export const AdminItems: { name: string, url: string }[] = [
    ...CommonItems
];
