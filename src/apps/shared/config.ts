export class ServerConfig {
	readonly PORT = process.env.PORT ?? 3000;
	readonly IS_PRODUCTION = process.env.NODE_ENV === "production";
}
