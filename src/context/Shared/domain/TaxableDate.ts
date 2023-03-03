import { NordicDate } from "./NordicDate";
import { SwedishDate } from "./SwedishDate";
import { TaxableDateType } from "./TaxableDateType";

export enum HolidayCalendars {
	Swedish = "Swedish",
	Nordic = "Nordic"
}

export class TaxableDate {
	static fromValue(date: string | number | Date, calendar: string): TaxableDateType {
		switch (calendar) {
			case HolidayCalendars.Nordic:
				return new NordicDate(date);
			case HolidayCalendars.Swedish:
				return new SwedishDate(date);
			default:
				throw new Error("Unknown calendar");
		}
	}
}
