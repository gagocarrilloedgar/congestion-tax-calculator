import calendarsData from "../../../../data/holidayCalendars.json";
import taxRules from "../../../../data/taxRules.json";

import { HolidayCalendars, HolidayCalendarTypes } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

import { TaxCalculator } from "../domain/TaxCalculator";
import { TaxPrices } from "../domain/TollFee";
import { TaxCalculatorResponse } from "./TaxCalculatorResponse";

export class GetTaxCalculator {
	city: string;
	taxRules: { [key: string]: TaxPrices[] };
	taxPrices: TaxPrices[];

	constructor(city: string) {
		this.city = city;
		this.taxRules = taxRules as unknown as { [key: string]: TaxPrices[] };
		this.taxPrices = this.getTaxRules(city);
	}

	execute(
		vehicle: Vehicle,
		dates: Date[],
		holidayCalendar: HolidayCalendarTypes
	): TaxCalculatorResponse {
		// Here we could load the calendar options from the database, but for now will simple import it from the json file
		const calendars = new HolidayCalendars(calendarsData);
		const calendar = calendars.getCalendar(holidayCalendar);
		const taxCalculator = new TaxCalculator(vehicle, this.taxPrices, calendar);

		const formatedDates = dates.map((date) => new TaxableDate(date));

		const taxFee = taxCalculator.getTax(formatedDates);

		return {
			taxFee,
			vehicleType: vehicle.getType(),
			error: null
		};
	}

	private getTaxRules = (city: string): TaxPrices[] => {
		const allowedCities = Object.keys(this.taxRules);
		const isAllowedCity = allowedCities.includes(city);

		return isAllowedCity ? this.taxRules[city] : this.taxRules["Gothenburg"];
	};
}
