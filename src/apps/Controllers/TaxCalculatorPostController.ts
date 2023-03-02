import { Request, Response } from "express";

import { Controller } from "./Controller";

import { GetTaxCalculator } from "../../context/TaxCalculator/application/GetTaxCalculator";
import { VehicleType } from "../../context/TaxCalculator/domain/constants";

export class TaxCalculatorPostController implements Controller {
	async run(req: Request, res: Response) {
		try {
			const { vehicleType, dates, city } = req.body as {
				vehicleType: VehicleType;
				dates: Date[];
				city: string;
			};

			const taxCalculator = new GetTaxCalculator(city);

			const taxCalculatorResponse = taxCalculator.execute(vehicleType, dates);

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
