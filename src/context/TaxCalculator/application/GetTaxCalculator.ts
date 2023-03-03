import * as taxRules from "../../../../data/taxRules.json";
import { TaxableDate } from "../../Shared/domain/TaxableDate";
import { Vehicle } from "../../Shared/domain/Vehicle";

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

	execute(vehicle: Vehicle, dates: Date[], holidayCalendar: string): TaxCalculatorResponse {
		const taxCalculator = new TaxCalculator(vehicle, this.taxPrices);
		const formatedDates = dates.map((date) => TaxableDate.fromValue(date, holidayCalendar));

		const taxFee = taxCalculator.getTax(formatedDates);

		console.log("taxFee", taxFee)

		return {
			taxFee,
			vehicleType: vehicle.getType(),
			error: null
		};
	}

	private getTaxRules = (city: string): TaxPrices[] => {
		const allowedCities = Object.keys(this.taxRules);
		const isAllowedCity = allowedCities.includes(city);

		return isAllowedCity ? this.taxRules[city] : this.taxRules["Gothenburg"];
	};
}
