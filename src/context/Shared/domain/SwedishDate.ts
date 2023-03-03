import { TaxableDateType, TollFreeDatesType } from "./TaxableDateType";

const SwedishTollFreeDates: TollFreeDatesType = {
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

export class SwedishDate extends TaxableDateType {
	constructor(date: string | number | Date) {
		super(date, SwedishTollFreeDates);
	}
}
