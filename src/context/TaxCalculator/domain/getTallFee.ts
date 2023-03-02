import { Vehicle } from "../../Shared/domain/Vehicle";
import { isTollFreeDate } from "./isTollFreeDate";

interface Schdeule {
	start: string;
	end: string;
}

export interface TaxPrices {
	price: number;
	schedule: Schdeule[];
}

export function getTollFee(date: Date, vehicle: Vehicle, taxRules: TaxPrices[]): number {
	if (isTollFreeDate(date) || vehicle.isTollFree()) return 0;

	const hour: number = date.getHours();
	const minute: number = date.getMinutes();

	const priceSchdule = taxRules.find((rule: any) => {
		return rule.schedule.find((schedule: Schdeule) => {
			const startingTime = getHoursAndMinutes(schedule.start);
			const endingTime = getHoursAndMinutes(schedule.end);

			return (
				(hour > startingTime.hours ||
					(hour === startingTime.hours && minute >= startingTime.minutes)) &&
				(hour < endingTime.hours || (hour === endingTime.hours && minute <= endingTime.minutes))
			);
		});
	});

	return priceSchdule ? priceSchdule.price : 0;
}

const getHoursAndMinutes = (start: string) => {
	const [hours, minutes] = start.split(":");
	return {
		hours: parseInt(hours),
		minutes: parseInt(minutes)
	};
};
