import * as taxRules from "../../../../data/taxRules.json";

import { NonTollFreeVehicles, TollFreeVehicles, VehicleType } from "../domain/constants";
import { TaxPrices } from "../domain/getTallFee";
import { TaxCalculator } from "../domain/TaxCalculator";
import { TaxCalculatorResponse } from "./TaxCalculatorResponse";

export class GetTaxCalculator {
	city: string;
	taxRules: { [key: string]: TaxPrices[] };
	taxPrices: TaxPrices[];

	constructor(city: string) {
		this.city = city;
		this.taxRules = taxRules as unknown as { [key: string]: TaxPrices[] };
		this.taxPrices = this.getTaxRules(city);
	}

	execute(vehicleType: VehicleType, dates: Date[]): TaxCalculatorResponse {
		const isAllowedVehicleType = this.isAllowedVehicleType(vehicleType);
		if (!isAllowedVehicleType)
			return {
				taxFee: 0,
				vehicleType,
				error: "Vehicle type not allowed"
			};

		const taxCalculator = new TaxCalculator(vehicleType, this.taxPrices);
		const formatedDates = dates.map((date) => new Date(date));

		const taxFee = taxCalculator.getTax(formatedDates);

		return {
			taxFee,
			vehicleType,
			error: null
		};
	}

	private getTaxRules = (city: string): TaxPrices[] => {
		const allowedCities = Object.keys(this.taxRules);
		const isAllowedCity = allowedCities.includes(city);

		return isAllowedCity ? this.taxRules[city] : this.taxRules["Gothenburg"];
	};

	private isAllowedVehicleType(vehicleType: VehicleType): boolean {
		return (
			Object.values(NonTollFreeVehicles).includes(vehicleType as NonTollFreeVehicles) ||
			Object.values(TollFreeVehicles).includes(vehicleType as TollFreeVehicles)
		);
	}
}
