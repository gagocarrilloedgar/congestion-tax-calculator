export interface TollFreeDatesType {
	[year: number]: {
		[month: number]: number[];
	};
}

export class TaxableDateType {
	private readonly SUNDAY = 0;
	private readonly SATURDAY = 6;
	date: Date;
	tollFreeDates: TollFreeDatesType;

	constructor(date: string | number | Date, tollFreeDates: TollFreeDatesType) {
		this.date = new Date(date);
		this.tollFreeDates = tollFreeDates;
	}

	isTollFree(): boolean {
		const year: number = this.date.getFullYear();
		const month: number = this.date.getMonth() + 1;
		const day: number = this.date.getDay();
		const dayOfMonth: number = this.date.getDate();

		const yearOrMonthNotAvailable = !this.tollFreeDates[year] || !this.tollFreeDates[year][month];

		if (yearOrMonthNotAvailable) return false;

		if (this.isSundayOrSaturday(day)) return true;

		if (this.tollFreeDates[year][month].includes(dayOfMonth)) return true;

		const priorToHoliday = this.isPriorToHoliday(dayOfMonth, month, year);

		if (priorToHoliday) return true;

		return false;
	}

	private isSundayOrSaturday(day: number): boolean {
		return day === this.SATURDAY || day === this.SUNDAY;
	}

	private isPriorToHoliday = (dayOfMonth: number, month: number, year: number): boolean => {
		const priorToHoliday = this.tollFreeDates[year][month].find(
			(holiday) => dayOfMonth === holiday - 1
		);

		return !!priorToHoliday;
	};

	getHours() {
		return this.date.getHours();
	}
	getMinutes() {
		return this.date.getMinutes();
	}

	getDay() {
		return this.date.getDay();
	}

	getMonth() {
		return this.date.getMonth();
	}

	getTime() {
		return this.date.getTime();
	}
}

/*export class DateValueObject2 extends Date {
	private readonly SUNDAY = 0;
	private readonly SATURDAY = 6;
	tollFreeDates: TollFreeDatesType;

	constructor(date: string | number | Date, tollFreeDates: TollFreeDatesType) {
		super(date);
		this.tollFreeDates = tollFreeDates;
	}

	isTollFree(): boolean {
		const year: number = this.getFullYear();
		const month: number = this.getMonth() + 1;
		const day: number = this.getDay();
		const dayOfMonth: number = this.getDate();

		const yearOrMonthNotAvailable = !this.tollFreeDates[year] || !this.tollFreeDates[year][month];

		if (yearOrMonthNotAvailable) return false;

		if (this.isSundayOrSaturday(day)) return true;

		if (this.tollFreeDates[year][month].includes(dayOfMonth)) return true;

		const priorToHoliday = this.isPriorToHoliday(dayOfMonth, month, year);

		if (priorToHoliday) return true;

		return false;
	}

	private isSundayOrSaturday(day: number): boolean {
		return day === this.SATURDAY || day === this.SUNDAY;
	}

	private isPriorToHoliday = (dayOfMonth: number, month: number, year: number): boolean => {
		const priorToHoliday = this.tollFreeDates[year][month].find(
			(holiday) => dayOfMonth === holiday - 1
		);

		return !!priorToHoliday;
	};
}*/
