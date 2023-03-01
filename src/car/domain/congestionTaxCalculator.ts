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
