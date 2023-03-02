interface ITollFreeDates {
	[year: number]: {
		[month: number]: number[];
	};
}

const TollFreeDates: ITollFreeDates = {
	2013: {
		1: [1],
		3: [28, 29],
		4: [1, 30],
		5: [1, 8, 9],
		6: [5, 6, 21],
		7: [],
		11: [1],
		12: [24, 25, 26, 31]
	}
};

const SATURDAY = 6;
const SUNDAY = 0;

export function isTollFreeDate(date: Date): boolean {
	const year: number = date.getFullYear();
	const month: number = date.getMonth() + 1;
	const day: number = date.getDay();
	const dayOfMonth: number = date.getDate();

	const yearOrMonthNotAvailable = !TollFreeDates[year] || !TollFreeDates[year][month];

	if (yearOrMonthNotAvailable) return false;

	if (isSundayOrSaturday(day)) return true;

	if (TollFreeDates[year][month].includes(dayOfMonth)) return true;

	const priorToHoliday = isPriorToHoliday(dayOfMonth, month, year);

	if (priorToHoliday) return true;

	return false;
}

export const isSundayOrSaturday = (day: number): boolean => day === SATURDAY || day === SUNDAY;

export const isPriorToHoliday = (dayOfMonth: number, month: number, year: number): boolean => {
	const priorToHoliday = TollFreeDates[year][month].find((holiday) => dayOfMonth === holiday - 1);

	return !!priorToHoliday;
};
