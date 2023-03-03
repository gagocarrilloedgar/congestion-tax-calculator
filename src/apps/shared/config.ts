export class ServerConfig {
	readonly PORT = process.env.PORT ?? 3000;
	readonly IS_PRODUCTION = process.env.NODE_ENV === "production";
	readonly IS_DEVELOPMENT = process.env.NODE_ENV === "development";
	readonly IS_TEST = process.env.NODE_ENV === "test";
}
