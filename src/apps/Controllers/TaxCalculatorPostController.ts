import { Request, Response } from "express";

import { Controller } from "./Controller";

import { HolidayCalendarTypes } from "../../context/shared/domain/HolidayCalendar";
import { VehicleTypes } from "../../context/shared/domain/VehicleType";

import httpStatus from "http-status";
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

		res.status(httpStatus.OK).send({
			taxFee: taxCalculatorResponse.taxFee,
			vehicleType: taxCalculatorResponse.vehicleType
		});
	}
}
