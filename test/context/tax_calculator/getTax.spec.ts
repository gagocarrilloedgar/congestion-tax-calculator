import taxRules from "../../../data/taxRules.json";
import { Vehicle } from "../../../src/context/Shared/domain/Vehicle";

import { TaxCalculator } from "../../../src/context/TaxCalculator/domain/TaxCalculator";

const firstIteration = [
	"2013-01-14 06:00:00", // 8
	"2013-01-14 08:00:00", // 18 -> = 8 + 18 = 26
	"2013-01-14 15:30:00", // 18 -> = 26 + 18 = 44
	"2013-01-14 17:00:00", // 13 -> = 44 + 13 = 57
	"2013-01-14 18:00:00", // 8 -> = 57 + 8 = 65
	"2013-02-15 06:00:00", // 8 -> = 60 + 8 = 68
	"2013-02-07 06:00:00" // 8 -> = 68 + 8 = 76
];

const secondIteration = [
	"2013-01-14 06:00:00", // 8
	"2013-01-14 08:00:00", // 18 -> = 8 + 18 = 26
	"2013-01-14 15:30:00", // 18 -> = 26 + 18 = 44
	"2013-01-14 17:00:00", // 13 -> = 44 + 13 = 57
	"2013-01-14 18:00:00", // 8 -> = 57 + 8 = 65
	"2013-02-15 06:00:00", // 8 -> = 60 + 8 = 68
	"2013-02-15 07:00:00", // 18 -> = 68 + 18 = 86
	"2013-02-15 07:00:00", // 18 -> = 68 + 18 = 86
	"2013-02-15 07:00:00", // 18 -> = 68 + 18 = 86
	"2013-02-15 08:00:00", // 13 -> = 86 + 13 = 99
	"2013-03-01 06:00:00", // 8 -> = 99 + 8 = 107
	"2013-03-05 06:00:00" // 8 -> = 107 + 8 = 115
];

describe("getTax", () => {
	const globalFormated: Date[] = firstIteration.map((date: string) => new Date(date));
	const car = Vehicle.fromValue("Car");
	const data = taxRules["Gothenburg"];

	const taxCalculator = new TaxCalculator(car, data);

	it("Should return 76 for the given times", () => {
		const expected = 76;
		const result = taxCalculator.getTax(globalFormated);

		expect(result).toBe(expected);
	});

	it("Should return 115 for the given times", () => {
		const formatedDates = secondIteration.map((date: string) => new Date(date));
		const expected = 136;
		const result = taxCalculator.getTax(formatedDates);

		expect(result).toBe(expected);
	});

	it("Should return 0 if no dates are given", () => {
		const expected = 0;
		const result = taxCalculator.getTax([]);

		expect(result).toBe(expected);
	});

	it("Should return 0 if is a toll free Vehicle", () => {
		const motorbike = Vehicle.fromValue("Motorcycle");
		const taxCalculatorMotorbike = new TaxCalculator(motorbike, data);
		const expected = 0;
		const result = taxCalculatorMotorbike.getTax(globalFormated);

		expect(result).toBe(expected);
	});
});
