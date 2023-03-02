import { getTollFee } from "./getTallFee";
import { Vehicle } from "./Vehicle";

const MAXIMUM_FEE = 60;
const MAXIMUM_INTERVAL = 60;
const MINIMUM_FEE = 0;

export function getTax(vehicle: Vehicle, dates: Date[]): number {
	let totalFee = MINIMUM_FEE;

	for (let i = 0; i < dates.length; i++) {
		const date = dates[i] as Date;
		if (i === 0 || hasExccededMaxInterval(dates[i - 1], date))
			totalFee += getTollFee(date, vehicle);
	}

	return totalFee > MAXIMUM_FEE ? MAXIMUM_FEE : totalFee;
}

export const hasExccededMaxInterval = (date1: Date, date2: Date): boolean => {
	const diffInMillies = date1.getTime() - date2.getTime();
	const minutes = diffInMillies / 1000 / 60;
	return minutes <= MAXIMUM_INTERVAL;
};

export const getTotalTax = (vehicle: Vehicle, dates: Date[]): number => {
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
		const tax = getTax(vehicle, dates);

		return acc + tax;
	}, 0);

	return totalTax;
};
