import { Car } from "../../../src/context/TaxCalculator/domain/Card";
import Motorbike from "../../../src/context/TaxCalculator/domain/Motorbike";

import { isTollFreeVehicle } from "../../../src/context/TaxCalculator/domain/isTollFreeVehicle";

describe("isTollFreeVehicle", () => {
	it("should return false if Card vehicle", () => {
		const vehicle = new Car();
		const expected = false;
		const result = isTollFreeVehicle(vehicle.getVehicleType());

		expect(result).toBe(expected);
	});

	it("should return true if Motorbike vehicle", () => {
		const vehicle = new Motorbike();
		const expected = true;
		const result = isTollFreeVehicle(vehicle.getVehicleType());

		expect(result).toBe(expected);
	});
});
