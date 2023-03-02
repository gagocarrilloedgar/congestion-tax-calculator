import {
	NonTollFreeVehicles,
	TollFreeVehicles
} from "../../../src/context/TaxCalculator/domain/constants";
import { isTollFreeVehicle } from "../../../src/context/TaxCalculator/domain/isTollFreeVehicle";

describe("isTollFreeVehicle", () => {
	it("should return false if Card vehicle", () => {
		const car = NonTollFreeVehicles.Car;
		const expected = false;
		const result = isTollFreeVehicle(car);

		expect(result).toBe(expected);
	});

	it("should return true if Motorbike vehicle", () => {
		const motorbike = TollFreeVehicles.Motorcycle;
		const expected = true;
		const result = isTollFreeVehicle(motorbike);

		expect(result).toBe(expected);
	});
});
