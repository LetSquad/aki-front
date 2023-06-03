import { RentSlotStatus } from "@models/rentSlots/enums";
import { EventStatus } from "@parts/EventCalendar/types/enums";

export function getRentSlotNameByRentSlotStatusEnum(rentSlotStatus: RentSlotStatus) {
    switch (rentSlotStatus) {
        case RentSlotStatus.OPEN: {
            return "Открытый слот";
        }
        case RentSlotStatus.BOOKED: {
            return "Забронированный слот";
        }
        case RentSlotStatus.CLOSED: {
            return "Закрытый слот";
        }
        // skip default
    }
}

export function getEventStatusByRentSlotStatusEnum(rentSlotStatus: RentSlotStatus) {
    switch (rentSlotStatus) {
        case RentSlotStatus.OPEN: {
            return EventStatus.OPEN;
        }
        case RentSlotStatus.BOOKED: {
            return EventStatus.BOOKED;
        }
        case RentSlotStatus.CLOSED: {
            return EventStatus.CLOSED;
        }
        // skip default
    }
}
