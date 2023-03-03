import { TaxPrices, TollFee } from "./TollFee";

import { HolidayCalendarType } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

export interface ITaxCalculator {
	getTax(dates: TaxableDate[]): number;
}

export class TaxCalculator implements ITaxCalculator {
	vehicle: Vehicle;
	taxPrices: TaxPrices[];
	MAXIMUM_FEE = 60;
	MAXIMUM_INTERVAL = 60;
	MINIMUM_FEE = 0;
	calendar: HolidayCalendarType;

	constructor(vehicle: Vehicle, taxPrices: TaxPrices[], calendar: HolidayCalendarType) {
		this.vehicle = vehicle;
		this.taxPrices = taxPrices;
		this.calendar = calendar;
	}

	public getTax = (dates: TaxableDate[]): number => {
		const groupedDates = dates.reduce((acc: any, date: TaxableDate) => {
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

	private getDailyTax(dates: []): number {
		let totalFee = this.MINIMUM_FEE;

		for (let i = 0; i < dates.length; i++) {
			const date = dates[i];
			if (i === 0 || this.hasExccededMaxInterval(dates[i - 1], date)) {
				const tollFee = new TollFee(date, this.vehicle, this.taxPrices).compute(this.calendar);
				totalFee += tollFee;
			}
		}

		return totalFee > this.MAXIMUM_FEE ? this.MAXIMUM_FEE : totalFee;
	}

	private hasExccededMaxInterval = (date1: TaxableDate, date2: TaxableDate): boolean => {
		const diffInMillies = date1.getTime() - date2.getTime();
		const minutes = diffInMillies / 1000 / 60;
		return minutes <= this.MAXIMUM_INTERVAL;
	};
}
