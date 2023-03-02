module.exports = {
	extends: ["standard"],
	parser: "@typescript-eslint/parser",
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"]
			}
		}
	]
};
