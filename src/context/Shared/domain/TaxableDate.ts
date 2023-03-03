import { HolidayCalendarType } from "./HolidayCalendar";

export interface TaxableDateType {
	isTollFree(tollFreeDates: HolidayCalendarType): boolean;
}

export class TaxableDate extends Date implements TaxableDateType {
	private readonly SUNDAY = 0;
	private readonly SATURDAY = 6;

	constructor(date: string | number | Date) {
		super(date);
	}

	isTollFree(tollFreeDates: HolidayCalendarType): boolean {
		const year: number = this.getFullYear();
		const month: number = this.getMonth() + 1;
		const day: number = this.getDay();
		const dayOfMonth: number = this.getDate();

		const yearOrMonthNotAvailable = !tollFreeDates[year] || !tollFreeDates[year][month];

		if (yearOrMonthNotAvailable) return false;

		if (this.isSundayOrSaturday(day)) return true;

		if (tollFreeDates[year][month].includes(dayOfMonth)) return true;

		const priorToHoliday = this.isPriorToHoliday(dayOfMonth, month, year, tollFreeDates);

		if (priorToHoliday) return true;

		return false;
	}

	private isSundayOrSaturday(day: number): boolean {
		return day === this.SATURDAY || day === this.SUNDAY;
	}

	private isPriorToHoliday = (
		dayOfMonth: number,
		month: number,
		year: number,
		tollFreeDates: HolidayCalendarType
	): boolean => {
		const priorToHoliday = tollFreeDates[year][month].find((holiday) => dayOfMonth === holiday - 1);

		return !!priorToHoliday;
	};
}
