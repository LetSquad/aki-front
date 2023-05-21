import { BasePageSlugs, LandLordPageSlugs } from "@models/pages/enums";

export const CommonItems: { name: string, url: string }[] = [
    {
        name: "Каталог площадок",
        url: BasePageSlugs.AREA_CATALOG
    }
];

export const RenterItems: { name: string, url: string }[] = [
    ...CommonItems
];

export const LandlordItems: { name: string, url: string }[] = [
    ...CommonItems,
    {
        name: "Создать площадку",
        url: LandLordPageSlugs.AREA_CREATE
    }, {
        name: "Мои площадки",
        url: LandLordPageSlugs.MY_AREAS
    }
];

export const AdminItems: { name: string, url: string }[] = [
    ...CommonItems
];
