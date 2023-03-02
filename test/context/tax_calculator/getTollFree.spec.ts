import taxRules from "../../../data/taxRules.json";

import {
	NonTollFreeVehicles,
	TollFreeVehicles
} from "../../../src/context/TaxCalculator/domain/constants";

import { getTollFee } from "../../../src/context/TaxCalculator/domain/getTallFee";

describe("getTollFee", () => {
	const car = NonTollFreeVehicles.Car;
	const data = taxRules["Gothenburg"];

	it("Should return 0 if is a motorbike or a TollFreeVehicle", () => {
		const date = new Date("2013-01-03 08:00");

		const vehicle = TollFreeVehicles.Motorcycle;
		const expected = 0;
		const result = getTollFee(date, vehicle, data);
		expect(result).toBe(expected);
	});

	it("should return 0 if inside taxt free time", () => {
		const date = new Date("2013-01-03 05:00");

		const expected = 0;
		const result = getTollFee(date, car, data);

		expect(result).toBe(expected);
	});

	it("Should return 8 if is inside the first zone", () => {
		const date = new Date("2013-01-03 08:30");
		const expected = 8;
		const result = getTollFee(date, car, data);

		expect(result).toBe(expected);
	});

	it("Should return 13 if is second the first zone", () => {
		const date = new Date("2013-01-03 15:00");
		const expected = 13;
		const result = getTollFee(date, car, data);

		expect(result).toBe(expected);
	});

	it("Should return 18 if is inside thrid zone and is a car", () => {
		const date = new Date("2013-01-03 07:00");
		const expected = 18;
		const result = getTollFee(date, car, data);

		expect(result).toBe(expected);
	});
});
