import express from "express";
import path from "path";

import { loadApiEndpoints } from "./apps/routes";
import { ServerConfig } from "./shared/config";

// Create Express server
const config = new ServerConfig();
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? config.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

loadApiEndpoints(app);

export default app;
