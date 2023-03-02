import { VehicleType } from "./constants";
import { getTollFee } from "./getTallFee";

export interface ITaxCalculator {
	getTax(dates: Date[]): number;
}

export class TaxCalculator implements ITaxCalculator {
	vehicleType: VehicleType;
	MAXIMUM_FEE = 60;
	MAXIMUM_INTERVAL = 60;
	MINIMUM_FEE = 0;

	constructor(vehicleType: VehicleType) {
		this.vehicleType = vehicleType;
	}

	private getDailyTax(type: VehicleType, dates: Date[]): number {
		let totalFee = this.MINIMUM_FEE;

		for (let i = 0; i < dates.length; i++) {
			const date = dates[i] as Date;
			if (i === 0 || this.hasExccededMaxInterval(dates[i - 1], date))
				totalFee += getTollFee(date, type);
		}

		return totalFee > this.MAXIMUM_FEE ? this.MAXIMUM_FEE : totalFee;
	}

	private hasExccededMaxInterval = (date1: Date, date2: Date): boolean => {
		const diffInMillies = date1.getTime() - date2.getTime();
		const minutes = diffInMillies / 1000 / 60;
		return minutes <= this.MAXIMUM_INTERVAL;
	};

	public getTax = (dates: Date[]): number => {
		const groupedDates = dates.reduce((acc: any, date: Date) => {
			const day = date.getDay();
			const month = date.getMonth();
			const key = `${month}-${day}`;

			if (!acc[key]) acc[key] = [];
			acc[key].push(date);
			return acc;
		}, {});

		const totalTax = Object.keys(groupedDates).reduce((acc: number, key: string) => {
			const dates = groupedDates[key];
			const vehicleType = this.vehicleType;
			const tax = this.getDailyTax(vehicleType, dates);

			return acc + tax;
		}, 0);

		return totalTax;
	};
}
