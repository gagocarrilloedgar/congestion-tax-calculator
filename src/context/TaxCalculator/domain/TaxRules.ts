export interface Schdeule {
	start: string;
	end: string;
}

export interface TaxPrices {
	price: number;
	schedule: Schdeule[];
}

export type TaxRules = TaxPrices[];
