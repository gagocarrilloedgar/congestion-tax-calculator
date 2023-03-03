import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import { ServerConfig } from "./config";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
	let { statusCode, message } = err;

	const config = new ServerConfig();

	if (config.IS_PRODUCTION && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(!config.IS_PRODUCTION && { stack: err.stack })
	};

	if (config.IS_DEVELOPMENT) console.error(err);

	res.status(statusCode).json({ error: response });
};
