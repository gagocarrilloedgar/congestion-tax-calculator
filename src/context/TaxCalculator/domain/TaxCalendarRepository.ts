import { HolidayCalendarType, HolidayCalendarTypes } from "../../shared/domain/HolidayCalendar";

export interface TaxCalendarRepository {
	search(calendarType: keyof typeof HolidayCalendarTypes): Promise<HolidayCalendarType>;
}
