import { Vehicle } from "./Vehicle";

export class Car implements Vehicle {
	getVehicleType(): string {
		return "Car";
	}
}
