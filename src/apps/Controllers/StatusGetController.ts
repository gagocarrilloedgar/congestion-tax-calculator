import { Request, Response } from "express";

import { Controller } from "./Controller";

export class StatusGetController implements Controller {
	async run(_req: Request, res: Response) {
		res.status(200).send({ message: "OK" });
	}
}
