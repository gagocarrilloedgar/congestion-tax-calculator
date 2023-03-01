module.exports = {
	extends: ["standard", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
	],
};
