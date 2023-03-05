import { HolidayCalendarType } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

import { Schdeule, TaxPricesSchedule } from "./TaxRules";

export interface ITaxFee {
	compute(): number;
}

export class TaxFee {
	date: TaxableDate;
	vehicle: Vehicle;
	taxPricesSchedule: TaxPricesSchedule;

	constructor(date: TaxableDate, vehicle: Vehicle, taxPricesSchedule: TaxPricesSchedule) {
		this.date = date;
		this.vehicle = vehicle;
		this.taxPricesSchedule = taxPricesSchedule;
	}

	public compute(holidayCalendar: HolidayCalendarType): number {
		if (this.date.isTollFree(holidayCalendar) || this.vehicle.isTollFree()) return 0;

		const hour: number = this.date.getHours();
		const minute: number = this.date.getMinutes();

		const priceSchdule = this.taxPricesSchedule.find((rule: any) => {
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
