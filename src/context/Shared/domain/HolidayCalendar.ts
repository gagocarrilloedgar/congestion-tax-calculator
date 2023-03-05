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
