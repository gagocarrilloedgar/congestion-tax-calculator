import { Request, Response } from "express";
import { GetTaxCalculator } from "../../context/TaxCalculator/application/GetTaxCalculator";
import { VehicleType } from "../../context/TaxCalculator/domain/constants";

import { Controller } from "./Controller";

export class TaxCalculatorPostController implements Controller {
	async run(req: Request, res: Response) {
		try {
			const { vehicleType, dates } = req.body as { vehicleType: VehicleType; dates: Date[] };

			const taxCalculator = new GetTaxCalculator();

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
