import taxRules from "../../../data/taxRules.json";
import { HolidayCalendars, TaxableDate } from "../../../src/context/Shared/domain/TaxableDate";
import { Vehicle } from "../../../src/context/Shared/domain/Vehicle";

import { TollFee } from "../../../src/context/TaxCalculator/domain/getTallFee";

describe("getTollFee", () => {
	const car = Vehicle.fromValue("Car");
	const data = taxRules["Gothenburg"];

	it("Should return 0 if is a motorbike or a TollFreeVehicle", () => {
		const date = TaxableDate.fromValue("2013-01-03 08:00", HolidayCalendars.Swedish);

		const vehicle = Vehicle.fromValue("Motorcycle");
		const expected = 0;
		const result = new TollFee(date, vehicle, data).compute();
		expect(result).toBe(expected);
	});

	it("should return 0 if inside taxt free time", () => {
		const date = TaxableDate.fromValue("2013-01-03 05:00", HolidayCalendars.Swedish);
		const expected = 0;
		const result = new TollFee(date, car, data).compute();

		expect(result).toBe(expected);
	});

	it("Should return 8 if is inside the first zone", () => {
		const date = TaxableDate.fromValue("2013-01-03 08:30", HolidayCalendars.Swedish);
		const expected = 8;
		const result = new TollFee(date, car, data).compute();

		expect(result).toBe(expected);
	});

	it("Should return 13 if is second the first zone", () => {
		const date = TaxableDate.fromValue("2013-01-03 15:00", HolidayCalendars.Swedish);
		const expected = 13;
		const result = new TollFee(date, car, data).compute();

		expect(result).toBe(expected);
	});

	it("Should return 18 if is inside thrid zone and is a car", () => {
		const date = TaxableDate.fromValue("2013-01-03 07:00", HolidayCalendars.Swedish);
		const expected = 18;
		const result = new TollFee(date, car, data).compute();

		expect(result).toBe(expected);
	});
});
