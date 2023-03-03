import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import AppError from "../../context/shared/domain/AppError";

export const errorConverter = (
	err: any,
	_req: Request,
	_res: Response,
	next: NextFunction
): void => {
	let error = err;
	const isErrorInstance = error instanceof AppError;
	if (!isErrorInstance) {
		const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new AppError(message, statusCode, false, error.stack);
	}
	next(error);
};
