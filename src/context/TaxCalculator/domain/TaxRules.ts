export interface Schdeule {
	start: string;
	end: string;
}

export interface TaxPrices {
	price: number;
	schedule: Schdeule[];
}

export type TaxPricesSchedule = TaxPrices[];

export interface AvailableTaxPriceRules {
	[city: string]: TaxPrices[];
}

export class TaxRules {
	city: string;
	DEFAULT_CITY: string = "Gothenburg";

	constructor(city: string) {
		this.city = city;
	}

	getSchedule(avilablePrices: AvailableTaxPriceRules): TaxPricesSchedule {
		const allowedCities = Object.keys(avilablePrices);
		const isAllowedCity = allowedCities.includes(this.city);

		return isAllowedCity ? avilablePrices[this.city] : avilablePrices[this.DEFAULT_CITY];
	}
}
