import { Car } from "../../../src/context/TaxCalculator/domain/Card";
import { getTollFee, TaxPrices } from "../../../src/context/TaxCalculator/domain/getTallFee";
import Motorbike from "../../../src/context/TaxCalculator/domain/Motorbike";

describe("getTollFee", () => {
	it("Should return 0 if is a motorbike or a TollFreeVehicle", () => {
		const date = new Date("2013-01-03 08:00");

		const vehicle = new Motorbike();
		const expected = TaxPrices.Free;
		const result = getTollFee(date, vehicle);
		expect(result).toBe(expected);
	});

	it("should return 0 if inside taxt free time", () => {
		const date = new Date("2013-01-03 05:00");
		const vehicle = new Car();
		const expected = 0;
		const result = getTollFee(date, vehicle);

		expect(result).toBe(expected);
	});

	it("Should return 8 if is inside the first zone", () => {
		const date = new Date("2013-01-03 08:30");
		const vehicle = new Car();
		const expected = TaxPrices.First;
		const result = getTollFee(date, vehicle);

		expect(result).toBe(expected);
	});

	it("Should return 13 if is second the first zone", () => {
		const date = new Date("2013-01-03 15:00");
		const vehicle = new Car();
		const expected = TaxPrices.Second;
		const result = getTollFee(date, vehicle);

		expect(result).toBe(expected);
	});

	it("Should return 18 if is inside thrid zone and is a car", () => {
		const date = new Date("2013-01-03 07:00");
		const vehicle = new Car();
		const expected = TaxPrices.Third;
		const result = getTollFee(date, vehicle);

		expect(result).toBe(expected);
	});
});
