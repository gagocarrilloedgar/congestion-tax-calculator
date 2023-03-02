import { Application } from "express";

import { StatusGetController } from "../Controllers/StatusGetController";

export const registerStatusRoutes = (app: Application) => {
	const controller = new StatusGetController();

	app.get("/api/status", controller.run.bind(controller));
};
