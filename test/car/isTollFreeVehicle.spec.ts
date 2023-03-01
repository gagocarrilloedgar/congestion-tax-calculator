import { Car } from "../../src/Car/domain/Card";
import Motorbike from "../../src/Car/domain/Motorbike";

import { isTollFreeVehicle } from "../../src/Car/domain/isTollFreeVehicle";

describe("isTollFreeVehicle", () => {
	it("should return false if Card vehicle", () => {
		const vehicle = new Car();
		const expected = false;
		const result = isTollFreeVehicle(vehicle);

		expect(result).toBe(expected);
	});

	it("should return true if Motorbike vehicle", () => {
		const vehicle = new Motorbike();
		const expected = true;
		const result = isTollFreeVehicle(vehicle);

		expect(result).toBe(expected);
	});
});
