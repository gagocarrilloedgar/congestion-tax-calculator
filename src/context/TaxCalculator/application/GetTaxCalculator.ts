import { HolidayCalendarTypes } from "../../shared/domain/HolidayCalendar";
import { TaxableDate } from "../../shared/domain/TaxableDate";
import { Vehicle } from "../../shared/domain/Vehicle";

import { InMemoryTaxCalendarRepository } from "../infrastructure/InMemoryTaxCalendarRepository";
import { InMemoryTaxRepository } from "../infrastructure/InMemoryTaxRepository";

import { VehicleTypes } from "../../shared/domain/VehicleType";
import { TaxCalculator } from "../domain/TaxCalculator";
import { TaxCalculatorResponse } from "./TaxCalculatorResponse";

export class GetTaxCalculator {
	city: string;
	vehicleType: VehicleTypes;

	constructor(city: string, vehicleType: VehicleTypes) {
		this.city = city;
		this.vehicleType = vehicleType;
	}

	async execute(
		dates: Date[],
		holidayCalendar: HolidayCalendarTypes
	): Promise<TaxCalculatorResponse> {
		const formatedDates = dates.map((date) => new TaxableDate(date));
		const vehicle = Vehicle.fromValue(this.vehicleType);

		const repository = new InMemoryTaxCalendarRepository();
		const taxRepository = new InMemoryTaxRepository();

		const calendar = await repository.search(holidayCalendar);
		const taxPricesSchdule = await taxRepository.search(this.city);

		const taxCalculator = new TaxCalculator(vehicle, taxPricesSchdule, calendar);

		const taxFee = taxCalculator.getTax(formatedDates);

		return {
			taxFee,
			vehicleType: vehicle.getType(),
			error: null
		};
	}
}
