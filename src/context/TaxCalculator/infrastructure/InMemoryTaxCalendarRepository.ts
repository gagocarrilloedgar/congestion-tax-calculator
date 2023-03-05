import calendarsData from "../../../../data/holidayCalendars.json";

import { HolidayCalendarsTypes } from "../../shared/domain/HolidayCalendar";

import { TaxCalendarRepository } from "../domain/TaxCalendarRepository";

export class InMemoryTaxCalendarRepository implements TaxCalendarRepository {
	search(): HolidayCalendarsTypes {
		return calendarsData;
	}
}
