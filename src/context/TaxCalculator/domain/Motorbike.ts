import { Vehicle } from "./Vehicle";
import { TollFreeVehicles } from "./constants";
export default class Motorbike implements Vehicle {
	getVehicleType(): string {
		return TollFreeVehicles.Motorcycle;
	}
}
