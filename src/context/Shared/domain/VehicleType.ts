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

export type VehicleTypes = TollFreeVehicleTypes | NonTollFreeVehicleTypes;

export const VehicleTypesEnums = {
	...TollFreeVehicleTypes,
	...NonTollFreeVehicleTypes
};

export class VehicleType extends EnumValueObject<VehicleTypes> {
	constructor(value: VehicleTypes) {
		super(value, Object.keys(VehicleTypesEnums) as VehicleTypes[]);
	}

	public isTollFree(): boolean {
		if (Object.values(TollFreeVehicleTypes).includes(this.value as TollFreeVehicleTypes))
			return true;

		return false;
	}

	static fromValue(value: string): VehicleType {
		const vehicleType = Object.values(VehicleTypesEnums).find(
			(type: NonTollFreeVehicleTypes | TollFreeVehicleTypes) => type === value
		);

		if (!vehicleType) throw new Error(`Invalid Vehicle of type ${value}`);

		return new VehicleType(vehicleType);
	}

	protected throwErrorForInvalidValue(value: NonTollFreeVehicleTypes | TollFreeVehicleTypes): void {
		throw new Error(`Invalid Vehicle of type ${value}`);
	}
}
