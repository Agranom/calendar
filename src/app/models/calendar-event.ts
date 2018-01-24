import {CalendarEvent} from 'calendar-utils/dist/calendar-utils';

export interface ExtendedCalendarEvent extends CalendarEvent {
    id: number;
    description: string;
    groupId: number;
    groupName: string;
    isCustomEvent: boolean;
    done: boolean;
}

