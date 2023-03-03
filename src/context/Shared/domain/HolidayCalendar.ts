export enum HolidayCalendarTypes {
	Swedish = "Swedish",
	Norwegian = "Norwegian"
}

export interface HolidayCalendarType {
	[year: number]: {
		[month: number]: number[];
	};
}

export interface HolidayCalendarsTypes {
	[calendar: string]: HolidayCalendarType;
}

export interface IHolidayCalendars {
	getCalendar(calendar: keyof typeof HolidayCalendarTypes): HolidayCalendarType;
}

export class HolidayCalendars implements IHolidayCalendars {
	calendars: HolidayCalendarsTypes;

	constructor(calendars: HolidayCalendarsTypes) {
		this.calendars = calendars;
	}

	public getCalendar(calendar: keyof typeof HolidayCalendarTypes): HolidayCalendarType {
		return this.calendars[calendar];
	}
}
