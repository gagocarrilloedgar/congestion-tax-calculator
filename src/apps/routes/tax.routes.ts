import { Router } from "express";

import { TaxCalculatorPostController } from "../controllers/TaxCalculatorPostController";

export const registerTaxCalculorRoutes = (app: Router) => {
	const controller = new TaxCalculatorPostController();

	app.post("/api/tax-calculator", controller.run.bind(controller));
};
