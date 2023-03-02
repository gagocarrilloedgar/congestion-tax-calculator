import { Application } from "express";

import { registerStatusRoutes } from "./status.routes";
import { registerTaxCalculorRoutes } from "./tax.routes";

export const loadApiEndpoints = (app: Application): void => {
	registerStatusRoutes(app);
	registerTaxCalculorRoutes(app);
};
