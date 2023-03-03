import { Request, Response } from "express";

import { Controller } from "./Controller";

import { Vehicle } from "../../context/Shared/domain/Vehicle";
import { GetTaxCalculator } from "../../context/TaxCalculator/application/GetTaxCalculator";

export class TaxCalculatorPostController implements Controller {
	async run(req: Request, res: Response) {
		try {
			const { vehicleType, dates, city, holidayCalendar } = req.body as {
				vehicleType: string;
				dates: Date[];
				city: string;
				holidayCalendar: string;
			};

			const taxCalculator = new GetTaxCalculator(city);
			const vehicle = Vehicle.fromValue(vehicleType);
			const taxCalculatorResponse = taxCalculator.execute(vehicle, dates, holidayCalendar);

			const httpStatus = taxCalculatorResponse.error ? 400 : 200;

			res.status(httpStatus).send({
				taxFee: taxCalculatorResponse.taxFee,
				vehicleType: taxCalculatorResponse.vehicleType,
				error: taxCalculatorResponse.error
			});

			return;
		} catch (error) {
			res.status(500).send({ message: "Bad Request" });
		}
	}
}
