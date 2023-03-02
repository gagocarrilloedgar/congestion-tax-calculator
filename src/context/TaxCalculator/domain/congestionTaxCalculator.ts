import { getTollFee } from "./getTallFee";
import { Vehicle } from "./Vehicle";

enum TollFreeVehicles {
	Motorcycle,
	Tractor,
	Emergency,
	Diplomat,
	Foreign,
	Military
}

const MAXIMUM_FEE = 60;
const MAXIMUM_INTERVAL = 60;
const MINIMUM_FEE = 0;

export function getTax(vehicle: Vehicle, dates: Date[]): number {
	const intervalStart: Date = dates[0];
	let totalFee = 0;

	for (const date of dates) {
		const nextFee = getTollFee(date, vehicle);
		let tempFee = getTollFee(intervalStart, vehicle);

		const diffInMillies = date.getTime() - intervalStart.getTime();
		const minutes = diffInMillies / 1000 / 60;

		if (minutes <= MAXIMUM_INTERVAL) {
			if (totalFee > MINIMUM_FEE) totalFee -= tempFee;
			if (nextFee >= tempFee) tempFee = nextFee;
			totalFee += tempFee;
		} else {
			totalFee += nextFee;
		}

		if (totalFee > MAXIMUM_FEE) totalFee = MAXIMUM_FEE;
	}

	return totalFee;
}

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
