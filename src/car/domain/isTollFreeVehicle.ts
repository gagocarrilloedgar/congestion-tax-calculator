import { TollFreeVehicles } from "./constants";
import { Vehicle } from "./Vehicle";

export function isTollFreeVehicle(vehicle: Vehicle): boolean {
	const vehicleType: string = vehicle.getVehicleType();

	return Object.keys(TollFreeVehicles).includes(vehicleType);
}
