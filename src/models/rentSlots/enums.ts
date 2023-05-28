export enum RentSlotStatus {
    OPEN = "OPEN",
    BOOKED = "BOOKED"
}

export enum RentSlotDuration {
    DAY = "day",
    HOUR = "hour"
}

export enum NewRentSlotsFieldName {
    TIME_START = "timeStart",
    TIME_END = "timeEnd",
    AROUND_THE_CLOCK = "aroundTheClock",
    DURATION = "duration",
    PRICE = "price",
    DATE_PERIOD = "datePeriods"
}

export enum NewRentSlotsDatePeriodsFieldName {
    DATE_START = "dateStart",
    DATE_END = "dateEnd"
}
