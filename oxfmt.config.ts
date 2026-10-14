import { defineConfig } from 'oxfmt';

export default defineConfig({
	overrides: [
		{
			files: ['*.jsonc', '**/*.code-snippets'],
			options: {
				trailingComma: 'none',
			},
		},
	],
	singleQuote: true,
	sortImports: {},
	sortPackageJson: {
		sortScripts: true,
	},
});
