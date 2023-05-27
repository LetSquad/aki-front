export const DAYS_IN_WEEK = 7;
export const DAYS_IN_WEEK_ARRAY = [...Array.from({ length: DAYS_IN_WEEK }, (_v, k) => k + 1).values()];

export const HOURS_OF_DAY = 24;
export const HOURS_OF_DAY_ARRAY = [...Array.from({ length: HOURS_OF_DAY }).keys()];
export const HOURS_OF_DAY_FORMAT_ARRAY = HOURS_OF_DAY_ARRAY.map((hour) => {
    const formatHour = hour.toString().length === 1 ? `0${hour}` : hour;
    return `${formatHour}:00`;
});

export const MINUTES_OF_HOUR = 60;
export const HOUR_DIVISION = [0, 10, 15, 20, 30, 40, 45, 50];
