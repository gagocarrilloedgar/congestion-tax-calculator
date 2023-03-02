import { VehicleType } from "./constants";
import { isTollFreeDate } from "./isTollFreeDate";
import { isTollFreeVehicle } from "./isTollFreeVehicle";

export enum TaxPrices {
	Free = 0,
	First = 8,
	Second = 13,
	Third = 18
}

const TaxPricesSchedule = [
	{ price: TaxPrices.Free, schedule: [{ start: "18:30", end: "05:59" }] },
	{
		price: TaxPrices.First,
		schedule: [
			{ start: "06:00", end: "06:29" },
			{ start: "08:30", end: "14:29" },
			{ start: "18:00", end: "18:29" }
		]
	},
	{
		price: TaxPrices.Second,
		schedule: [
			{ start: "06:30", end: "06:59" },
			{ start: "08:00", end: "08:29" },
			{ start: "15:00", end: "15:29" },
			{
				start: "17:00",
				end: "17:59"
			}
		]
	},
	{
		price: TaxPrices.Third,
		schedule: [
			{ start: "07:00", end: "07:59" },
			{ start: "15:30", end: "16:59" }
		]
	}
];

export function getTollFee(date: Date, vehicleType: VehicleType): number {
	if (isTollFreeDate(date) || isTollFreeVehicle(vehicleType)) return 0;

	const hour: number = date.getHours();
	const minute: number = date.getMinutes();

	const priceSchdule = TaxPricesSchedule.find((price) => {
		return price.schedule.find((schedule) => {
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
