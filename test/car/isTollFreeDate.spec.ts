import { isTollFreeDate } from "../../src/Car/domain/isTollFreeDate";

describe("isTollFreeDate", () => {
	it("If Sunday or Holiday it should return true", () => {
		const date = new Date("2013-01-01");
		const expected = true;
		const result = isTollFreeDate(date);

		expect(result).toBe(expected);
	});

	it("If Saturday it should return true", () => {
		const date = new Date("2013-01-05");
		const expected = true;
		const result = isTollFreeDate(date);

		expect(result).toBe(expected);
	});

	it("If Not 2013 it should return false", () => {
		const date = new Date("2012-01-01");
		const expected = false;
		const result = isTollFreeDate(date);

		expect(result).toBe(expected);
	});

	it("It should return false if not a toll free day", () => {
		const date = new Date("2013-01-02");
		const expected = false;
		const result = isTollFreeDate(date);

		expect(result).toBe(expected);
	});
});
