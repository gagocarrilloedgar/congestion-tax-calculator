import { HolidayCalendars, HolidayCalendarTypes } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

import { InMemoryTaxCalendarRepository } from "../infrastructure/InMemoryTaxCalendarRepository";
import { InMemoryTaxRepository } from "../infrastructure/InMemoryTaxRepository";

import { VehicleTypes } from "../../shared/domain/VehicleType";
import { TaxCalculator } from "../domain/TaxCalculator";
import { TaxRules } from "../domain/TaxRules";
import { TaxCalculatorResponse } from "./TaxCalculatorResponse";

export class GetTaxCalculator {
	city: string;
	vehicleType: VehicleTypes;

	constructor(city: string, vehicleType: VehicleTypes) {
		this.city = city;
		this.vehicleType = vehicleType;
	}

	execute(dates: Date[], holidayCalendar: HolidayCalendarTypes): TaxCalculatorResponse {
		const formatedDates = dates.map((date) => new TaxableDate(date));
		const vehicle = Vehicle.fromValue(this.vehicleType);

		const repository = new InMemoryTaxCalendarRepository();
		const calendarsData = repository.search();

		const taxRepository = new InMemoryTaxRepository();
		const rules = taxRepository.search();

		const tax = new TaxRules(this.city);
		const taxPricesSchdule = tax.getSchedule(rules);

		const calendars = new HolidayCalendars(calendarsData);
		const calendar = calendars.getCalendar(holidayCalendar);

		const taxCalculator = new TaxCalculator(vehicle, taxPricesSchdule, calendar);

		const taxFee = taxCalculator.getTax(formatedDates);

		return {
			taxFee,
			vehicleType: vehicle.getType(),
			error: null
		};
	}
}
