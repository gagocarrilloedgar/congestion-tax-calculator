import { TollFreeVehicles } from "./constants";

export function isTollFreeVehicle(vehicleType: TollFreeVehicles | string): boolean {
	return Object.keys(TollFreeVehicles).includes(vehicleType);
}
