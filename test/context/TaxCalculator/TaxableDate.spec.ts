import holydaysData from "../../../data/holidayCalendars.json";

import { HolidayCalendarType } from "../../../src/context/shared/domain/HolidayCalendar";
import { TaxableDate } from "../../../src/context/shared/domain/TaxableDate";

describe("isTollFreeDate", () => {
	// This is not important for the testing of the TaxableDate class
	const swedishCalendar = holydaysData.Swedish as HolidayCalendarType;

	it("If Sunday or Holiday it should return true", () => {
		const date = new TaxableDate("2013-01-01");

		const expected = true;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});

	it("If Saturday it should return true", () => {
		const date = new TaxableDate("2013-01-05");

		const expected = true;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});

	it("If Not 2013 it should return false", () => {
		const date = new TaxableDate("2014-01-01");
		const expected = false;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});

	it("It should return false if not a toll free day", () => {
		const date = new TaxableDate("2013-01-02");
		const expected = false;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});

	it("If prior to holiday should return true", () => {
		const date = new TaxableDate("2013-04-29");
		const expected = true;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});

	it("If month is not inside the list should return false", () => {
		const date = new TaxableDate("2013-02-01");
		const expected = false;
		const result = date.isTollFree(swedishCalendar);

		expect(result).toBe(expected);
	});
});
