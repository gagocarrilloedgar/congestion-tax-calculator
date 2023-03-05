import holydaysData from "../../../data/holidayCalendars.json";
import taxRules from "../../../data/taxes.json";

import { HolidayCalendarType } from "../../../src/context/shared/domain/HolidayCalendar";
import { TaxableDate } from "../../../src/context/shared/domain/TaxableDate";
import { Vehicle } from "../../../src/context/shared/domain/Vehicle";
import { TaxCalculator } from "../../../src/context/TaxCalculator/domain/TaxCalculator";

import { mockData } from "../../fixtures/mockData";

describe("TaxCalculator", () => {
	const swedishCalendar = holydaysData.Swedish as HolidayCalendarType;
	const { firstUseCase, secondUseCase } = mockData;

	const globalFormated = firstUseCase.map((date: string) => new TaxableDate(date));
	const car = Vehicle.fromValue("Car");
	const data = taxRules["Gothenburg"];

	const taxCalculator = new TaxCalculator(car, data, swedishCalendar);

	it("Should return 76 for the given times", () => {
		const expected = 76;
		const result = taxCalculator.getTax(globalFormated);

		expect(result).toBe(expected);
	});

	it("Should return 115 for the given times", () => {
		const formatedDates = secondUseCase.map((date: string) => new TaxableDate(date));
		const expected = 136;
		const result = taxCalculator.getTax(formatedDates);

		expect(result).toBe(expected);
	});

	it("Should return 0 if no dates are given", () => {
		const expected = 0;
		const result = taxCalculator.getTax([]);

		expect(result).toBe(expected);
	});

	it("Should return 0 if is a toll free Vehicle", () => {
		const motorbike = Vehicle.fromValue("Motorcycle");
		const taxCalculatorMotorbike = new TaxCalculator(motorbike, data, swedishCalendar);
		const expected = 0;
		const result = taxCalculatorMotorbike.getTax(globalFormated);

		expect(result).toBe(expected);
	});
});
