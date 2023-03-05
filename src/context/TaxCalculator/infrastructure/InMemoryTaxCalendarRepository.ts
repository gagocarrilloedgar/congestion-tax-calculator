import calendarsData from "../../../../data/holidayCalendars.json";
import AppError from "../../shared/domain/AppError";

import { HolidayCalendarTypes } from "../../shared/domain/HolidayCalendar";

import { TaxCalendarRepository } from "../domain/TaxCalendarRepository";

export class InMemoryTaxCalendarRepository implements TaxCalendarRepository {
	async search(calendarType: keyof typeof HolidayCalendarTypes) {
		if (!calendarsData[calendarType]) throw new AppError("Calendar type not available", 415);

		return Promise.resolve(calendarsData[calendarType]);
	}
}
