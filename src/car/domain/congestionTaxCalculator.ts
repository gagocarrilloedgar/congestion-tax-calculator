import { Vehicle } from "./Vehicle";

const MAXIMUM_FEE = 60;

export function getTax(vehicle: Vehicle, dates: Date[]): number {
	const intervalStart: Date = dates[0];
	let totalFee = 0;

	for (const date of dates) {
		const nextFee = getTollFee(date, vehicle);
		let tempFee = getTollFee(intervalStart, vehicle);

		const diffInMillies = date.getTime() - intervalStart.getTime();
		const minutes = diffInMillies / 1000 / 60;

		if (minutes <= 60) {
			if (totalFee > 0) {
				totalFee -= tempFee;
			}
			if (nextFee >= tempFee) {
				tempFee = nextFee;
			}
			totalFee += tempFee;
		} else {
			totalFee += nextFee;
		}

		if (totalFee > 60) {
			totalFee = 60;
		}

		// return totalFee;
	}

	return 0;
}

export function getTollFee(date: Date, vechicle: Vehicle): number {
	if (isTollFreeDate(date) || isTollFreeVehicle(vechicle)) {
		return 0;
	}

	const hour: number = date.getHours();
	const minute: number = date.getMinutes();

	if (hour === 6 && minute >= 0 && minute <= 29) {
		return 8;
	}
	if (hour === 6 && minute >= 30 && minute <= 59) {
		return 13;
	}
	if (hour === 7 && minute >= 0 && minute <= 59) {
		return 18;
	}
	if (hour === 8 && minute >= 0 && minute <= 29) {
		return 13;
	}
	if (hour >= 8 && hour <= 14 && minute >= 30 && minute <= 59) {
		return 8;
	}
	if (hour === 15 && minute >= 0 && minute <= 29) {
		return 13;
	}
	if ((hour === 15 && minute >= 0) || (hour === 16 && minute <= 59)) {
		return 18;
	}
	if (hour === 17 && minute >= 0 && minute <= 59) {
		return 13;
	}
	if (hour === 18 && minute >= 0 && minute <= 29) {
		return 8;
	}

	return 0;
}
