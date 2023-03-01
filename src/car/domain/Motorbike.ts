import Vehicle from "./Vehicle";

export default class Motorbike implements Vehicle {
	getVehicleType(): string {
		return "Motorbike";
	}
}
