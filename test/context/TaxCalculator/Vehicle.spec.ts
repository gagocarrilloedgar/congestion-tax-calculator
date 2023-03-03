import { Vehicle } from "../../../src/context/shared/domain/Vehicle";

describe("isTollFreeVehicle", () => {
	it("Should return false if Card vehicle", () => {
		const car = Vehicle.fromValue("Car");
		const expected = false;
		const result = car.isTollFree();

		expect(result).toBe(expected);
	});

	it("Should return true if Motorbike vehicle", () => {
		const motorbike = Vehicle.fromValue("Motorcycle");
		const expected = true;
		const result = motorbike.isTollFree();

		expect(result).toBe(expected);
	});
});
