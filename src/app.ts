import express from "express";
import path from "path";

import Router from "express-promise-router";

import { loadApiEndpoints } from "./apps/routes";
import { ServerConfig } from "./apps/shared/config";
import { errorConverter } from "./apps/shared/erroConverter";
import { errorHandler } from "./apps/shared/errorHandler";

// Create Express server
const config = new ServerConfig();
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? config.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

// API routes
const router = Router();

app.use(router);
loadApiEndpoints(router);

// Convert error to AppError
router.use(errorConverter);

// Handle error
router.use(errorHandler);

export default app;
