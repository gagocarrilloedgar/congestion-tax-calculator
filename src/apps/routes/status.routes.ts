import { Router } from "express";

import { StatusGetController } from "../Controllers/StatusGetController";

export const registerStatusRoutes = (app: Router) => {
	const controller = new StatusGetController();

	app.get("/api/status", controller.run.bind(controller));
};
