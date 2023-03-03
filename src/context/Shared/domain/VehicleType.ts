import AppError from "./AppError";
import { EnumValueObject } from "./EnumValueObject";

export enum TollFreeVehicleTypes {
	Emergency = "Emergency",
	Busses = "Busses",
	Diplomat = "Diplomat",
	Motorcycle = "Motorcycle",
	Foreign = "Foreign",
	Military = "Military"
}

export enum NonTollFreeVehicleTypes {
	Car = "Car",
	Tractor = "Tractor"
}

export const VehicleTypesEnum = {
	...TollFreeVehicleTypes,
	...NonTollFreeVehicleTypes
};

export type VehicleTypes = keyof typeof VehicleTypesEnum;

export class VehicleType extends EnumValueObject<VehicleTypes> {
	constructor(value: VehicleTypes) {
		super(value, Object.values(VehicleTypesEnum));
	}

	public isTollFree(): boolean {
		if (Object.values(TollFreeVehicleTypes).includes(this.value as TollFreeVehicleTypes))
			return true;

		return false;
	}

	static fromValue(value: VehicleTypes): VehicleType {
		return new VehicleType(VehicleTypesEnum[value]);
	}

	protected throwErrorForInvalidValue(value: VehicleTypes): void {
		throw new AppError(`Invalid vehicle type: ${value}`, 415);
	}
}
