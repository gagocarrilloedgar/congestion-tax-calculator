import { Request, Response } from "express";

import { Controller } from "./Controller";

import { HolidayCalendarTypes } from "../../context/shared/domain/HolidayCalendar";
import { VehicleTypes } from "../../context/shared/domain/VehicleType";

import { GetTaxCalculator } from "../../context/TaxCalculator/application/GetTaxCalculator";

export class TaxCalculatorPostController implements Controller {
	async run(req: Request, res: Response) {
		const { vehicleType, dates, city, holidayCalendar } = req.body as {
			vehicleType: VehicleTypes;
			dates: Date[];
			city: string;
			holidayCalendar: HolidayCalendarTypes;
		};

		const taxCalculator = new GetTaxCalculator(city, vehicleType);

		const taxCalculatorResponse = await taxCalculator.execute(dates, holidayCalendar);
		const httpStatus = taxCalculatorResponse.error ? 400 : 200;

		res.status(httpStatus).send({
			taxFee: taxCalculatorResponse.taxFee,
			vehicleType: taxCalculatorResponse.vehicleType,
			error: taxCalculatorResponse.error
		});
	}
}
