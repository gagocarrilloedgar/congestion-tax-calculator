import { NonTollFreeVehicleTypes, VehicleType, VehicleTypes } from "./VehicleType";

export class Vehicle {
	readonly type: VehicleType;

	constructor(type: VehicleType) {
		this.type = type;
	}

	static fromValue(value: VehicleTypes): Vehicle {
		return new Vehicle(VehicleType.fromValue(value) || NonTollFreeVehicleTypes.Car);
	}

	public isTollFree(): boolean {
		return this.type.isTollFree();
	}

	public getType(): VehicleTypes {
		return this.type.value;
	}
}
