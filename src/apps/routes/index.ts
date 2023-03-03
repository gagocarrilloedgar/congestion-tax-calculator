import { Router } from "express";

import { registerStatusRoutes } from "./status.routes";
import { registerTaxCalculorRoutes } from "./tax.routes";

export const loadApiEndpoints = (router: Router): void => {
	registerStatusRoutes(router);
	registerTaxCalculorRoutes(router);
};
