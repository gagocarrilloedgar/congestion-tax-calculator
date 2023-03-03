import { HolidayCalendarType } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

interface Schdeule {
	start: string;
	end: string;
}

export interface TaxPrices {
	price: number;
	schedule: Schdeule[];
}

export interface ITollFee {
	compute(): number;
}

export class TollFee {
	date: TaxableDate;
	vehicle: Vehicle;
	taxRules: TaxPrices[];

	constructor(date: TaxableDate, vehicle: Vehicle, taxRules: TaxPrices[]) {
		this.date = date;
		this.vehicle = vehicle;
		this.taxRules = taxRules;
	}

	public compute(holidayCalendar: HolidayCalendarType): number {
		if (this.date.isTollFree(holidayCalendar) || this.vehicle.isTollFree()) return 0;

		const hour: number = this.date.getHours();
		const minute: number = this.date.getMinutes();

		const priceSchdule = this.taxRules.find((rule: any) => {
			return rule.schedule.find((schedule: Schdeule) => {
				const startingTime = this.getHoursAndMinutes(schedule.start);
				const endingTime = this.getHoursAndMinutes(schedule.end);

				return (
					(hour > startingTime.hours ||
						(hour === startingTime.hours && minute >= startingTime.minutes)) &&
					(hour < endingTime.hours || (hour === endingTime.hours && minute <= endingTime.minutes))
				);
			});
		});

		return priceSchdule ? priceSchdule.price : 0;
	}

	private getHoursAndMinutes(start: string) {
		const [hours, minutes] = start.split(":");
		return {
			hours: parseInt(hours),
			minutes: parseInt(minutes)
		};
	}
}
