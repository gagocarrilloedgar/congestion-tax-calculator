import { Car } from "../../../src/context/TaxCalculator/domain/Card";
import { getTotalTax } from "../../../src/context/TaxCalculator/domain/congestionTaxCalculator";
import Motorbike from "../../../src/context/TaxCalculator/domain/Motorbike";

const dates = [
	"2013-01-14 06:00:00", // 8
	"2013-01-14 08:00:00", // 18 -> = 8 + 18 = 26
	"2013-01-14 15:30:00", // 18 -> = 26 + 18 = 44
	"2013-01-14 17:00:00", // 13 -> = 44 + 13 = 57
	"2013-01-14 18:00:00", // 8 -> = 57 + 8 = 65
	"2013-02-15 06:00:00", // 8 -> = 60 + 8 = 68
	"2013-02-07 06:00:00" // 8 -> = 68 + 8 = 76
];

describe("getTax", () => {
	const formatedDates: Date[] = dates.map((date: string) => new Date(date));

	it("Should return 18 for the given times", () => {
		const car = new Car();
		const expected = 76;
		const result = getTotalTax(car, formatedDates);

		expect(result).toBe(expected);
	});

	it("Should return 0 if no dates are given", () => {
		const car = new Car();
		const expected = 0;
		const result = getTotalTax(car, []);

		expect(result).toBe(expected);
	});

	it("Should return 0 if is a toll free Vehicle", () => {
		const motorbike = new Motorbike();
		const expected = 0;
		const result = getTotalTax(motorbike, formatedDates);

		expect(result).toBe(expected);
	});
});
