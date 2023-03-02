import { Application } from "express";

import { TaxCalculatorPostController } from "../Controllers/TaxCalculatorPostController";

export const registerTaxCalculorRoutes = (app: Application) => {
	const controller = new TaxCalculatorPostController();

	app.post("/api/tax-calculator", controller.run.bind(controller));
};
