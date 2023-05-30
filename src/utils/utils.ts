import { DateTime } from "luxon";

import { PriceType } from "@models/places/enums";
import { RentSlotDuration } from "@models/rentSlots/enums";

export function getFullName(firstName?: string | null, middleName?: string | null, lastName?: string | null): string {
    return `${lastName || ""}${lastName && (firstName || middleName) ? " " : ""}${firstName || ""}${
        firstName && middleName ? " " : ""
    }${middleName || ""}`;
}

export function getAgeByDate(birthDateString: string) {
    const birthDate = DateTime.fromFormat(birthDateString, "yyyy-MM-dd");
    const {
        years,
        months
    } = birthDate.diffNow(["years", "months"]);

    const integerYears = Math.floor(Math.abs(years));
    const integerMonths = Math.floor(Math.abs(months));

    if (integerYears !== 0) {
        if (integerYears % 100 >= 11 && integerYears % 100 <= 14) {
            return `${integerYears} лет`;
        }
        if (integerYears % 10 === 1) {
            return `${integerYears} год`;
        }
        if (integerYears % 10 >= 2 && integerYears % 10 <= 4) {
            return `${integerYears} года`;
        }
        return `${integerYears} лет`;
    }
    return `${integerMonths} мес.`;
}

export function equalNumberWithStringOrNumber(arg1?: number, arg2?: string | number): boolean {
    if (arg2 === undefined || arg1 === undefined) {
        return false;
    }

    if (typeof arg2 === "number") {
        return arg1 === arg2;
    }

    return arg1 === Number.parseInt(arg2, 10);
}

export function containsStringOrNumberInNumberArray(arg1: number[], arg2?: string | number): boolean {
    if (arg2 === undefined) {
        return false;
    }

    if (typeof arg2 === "number") {
        return arg1.includes(arg2);
    }

    return arg1.includes(Number.parseInt(arg2, 10));
}

export function capitalizeFirstLetter([first, ...rest]: string) {
    return first.toUpperCase() + rest.join("");
}

export function isSameDate(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.day === secondDay.day && firstDay.month === secondDay.month && firstDay.year === secondDay.year;
}

export function isSameWeek(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.year === secondDay.year && firstDay.weekNumber === secondDay.weekNumber;
}

export function isSameMonth(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.month === secondDay.month;
}

export function getFormatTimeInterval(firstDate: string, secondDate: string): string;
export function getFormatTimeInterval(firstDate: DateTime, secondDate: DateTime): string;
export function getFormatTimeInterval(firstDate: string | DateTime, secondDate: string | DateTime): string {
    const formatFirstDate = typeof firstDate === "string" ? DateTime.fromISO(firstDate) : firstDate;
    const formatSecondDate = typeof secondDate === "string" ? DateTime.fromISO(secondDate) : secondDate;

    return `${formatFirstDate.toFormat("T")}-${formatSecondDate.toFormat("T")}`;
}

export function getPriceTypeTitleFromEnum(priceType: PriceType): string {
    switch (priceType) {
        case PriceType.DAY: {
            return "/день";
        }
        case PriceType.HOUR: {
            return "/час";
        }
        case PriceType.RENT: {
            return "/аренду";
        }
        case PriceType.FREE: {
            return "Бесплатно";
        }
        // skip default
    }
}

export function getCapacityTitleFromNumbers(minCapacity?: number | null, maxCapacity?: number | null): string {
    const minCapacityTitle = minCapacity
        ? `от ${minCapacity}`
        : "";
    const maxCapacityTitle = maxCapacity
        ? `до ${maxCapacity}`
        : "";

    return `${minCapacityTitle}${minCapacityTitle && maxCapacityTitle ? " " : ""}${maxCapacityTitle} человек`;
}

export function getRentSlotDurationTitleFromEnum(rentSlotDuration: RentSlotDuration): string {
    switch (rentSlotDuration) {
        case RentSlotDuration.DAY: {
            return "День";
        }
        case RentSlotDuration.HOUR: {
            return "Час";
        }
        // skip default
    }
}

export function parseParams(params: Record<string, any>) {
    const keys = Object.keys(params);
    let options = "";

    for (const key of keys) {
        const isParamTypeUndefined = params[key] === undefined || params[key] === null;
        const isParamTypeObject = typeof params[key] === "object";
        const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

        if (!isParamTypeObject && !isParamTypeUndefined) {
            options += `${key}=${params[key]}&`;
        }

        if (isParamTypeObject && isParamTypeArray) {
            for (const element of params[key]) {
                options += `${key}=${element}&`;
            }
        }
    }

    return options ? options.slice(0, -1) : options;
}
