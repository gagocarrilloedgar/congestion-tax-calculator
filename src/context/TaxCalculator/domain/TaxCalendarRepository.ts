import { HolidayCalendarsTypes } from "../../shared/domain/HolidayCalendar";

export interface TaxCalendarRepository {
	search(): HolidayCalendarsTypes;
}
