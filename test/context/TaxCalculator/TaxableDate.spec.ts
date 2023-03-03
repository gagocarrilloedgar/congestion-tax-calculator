import { HolidayCalendars, TaxableDate } from "../../../src/context/Shared/domain/TaxableDate";

describe("isTollFreeDate", () => {
	it("If Sunday or Holiday it should return true", () => {
		const date = TaxableDate.fromValue("2013-01-01", HolidayCalendars.Swedish);

		const expected = true;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});

	it("If Saturday it should return true", () => {
		const date = TaxableDate.fromValue("2013-01-05", HolidayCalendars.Swedish);
		const expected = true;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});

	it("If Not 2013 it should return false", () => {
		const date = TaxableDate.fromValue("2014-01-01", HolidayCalendars.Swedish);
		const expected = false;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});

	it("It should return false if not a toll free day", () => {
		const date = TaxableDate.fromValue("2013-01-02", HolidayCalendars.Swedish);
		const expected = false;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});

	it("If prior to holiday should return true", () => {
		const date = TaxableDate.fromValue("2013-04-29", HolidayCalendars.Swedish);
		const expected = true;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});

	it("If month is not inside the list should return false", () => {
		const date = TaxableDate.fromValue("2013-02-01", HolidayCalendars.Swedish);
		const expected = false;
		const result = date.isTollFree();

		expect(result).toBe(expected);
	});
});
