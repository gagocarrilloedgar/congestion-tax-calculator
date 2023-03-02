import { NonTollFreeVehicles, TollFreeVehicles, VehicleType } from "../domain/constants";
import { TaxCalculator } from "../domain/TaxCalculator";
import { TaxCalculatorResponse } from "./TaxCalculatorResponse";

export class GetTaxCalculator {
	execute(vehicleType: VehicleType, dates: Date[]): TaxCalculatorResponse {
		const isAllowedVehicleType = this.isAllowedVehicleType(vehicleType);
		if (!isAllowedVehicleType)
			return {
				taxFee: 0,
				vehicleType,
				error: "Vehicle type not allowed"
			};

		const taxCalculator = new TaxCalculator(vehicleType);
		const formatedDates = dates.map((date) => new Date(date));

		const taxFee = taxCalculator.getTax(formatedDates);

		return {
			taxFee,
			vehicleType,
			error: null
		};
	}

	private isAllowedVehicleType(vehicleType: VehicleType): boolean {
		return (
			Object.values(NonTollFreeVehicles).includes(vehicleType as NonTollFreeVehicles) ||
			Object.values(TollFreeVehicles).includes(vehicleType as TollFreeVehicles)
		);
	}
}
