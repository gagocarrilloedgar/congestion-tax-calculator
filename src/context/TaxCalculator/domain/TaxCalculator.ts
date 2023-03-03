import { TaxableDateType } from "../../Shared/domain/TaxableDateType";
import { Vehicle } from "../../Shared/domain/Vehicle";
import { TaxPrices, TollFee } from "./getTallFee";

export interface ITaxCalculator {
	getTax(dates: TaxableDateType[]): number;
}

export class TaxCalculator implements ITaxCalculator {
	vehicle: Vehicle;
	taxPrices: TaxPrices[];
	MAXIMUM_FEE = 60;
	MAXIMUM_INTERVAL = 60;
	MINIMUM_FEE = 0;

	constructor(vehicle: Vehicle, taxPrices: TaxPrices[]) {
		this.vehicle = vehicle;
		this.taxPrices = taxPrices;
	}

	private getDailyTax(dates: []): number {
		let totalFee = this.MINIMUM_FEE;

		for (let i = 0; i < dates.length; i++) {
			const date = dates[i];
			if (i === 0 || this.hasExccededMaxInterval(dates[i - 1], date)) {
				const tollFee = new TollFee(date, this.vehicle, this.taxPrices).compute();
				totalFee += tollFee;
			}
		}

		return totalFee > this.MAXIMUM_FEE ? this.MAXIMUM_FEE : totalFee;
	}

	private hasExccededMaxInterval = (date1: TaxableDateType, date2: TaxableDateType): boolean => {
		const diffInMillies = date1.getTime() - date2.getTime();
		const minutes = diffInMillies / 1000 / 60;
		return minutes <= this.MAXIMUM_INTERVAL;
	};

	public getTax = (dates: TaxableDateType[]): number => {
		const groupedDates = dates.reduce((acc: any, date: TaxableDateType) => {
			const day = date.getDay();
			const month = date.getMonth();
			const key = `${month}-${day}`;

			if (!acc[key]) acc[key] = [];
			acc[key].push(date);
			return acc;
		}, {});

		const totalTax = Object.keys(groupedDates).reduce((acc: number, key: string) => {
			const dates = groupedDates[key];
			const tax = this.getDailyTax(dates);

			return acc + tax;
		}, 0);

		return totalTax;
	};
}
