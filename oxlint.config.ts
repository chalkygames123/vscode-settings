import globals from 'globals';
import { defineConfig } from 'oxlint';

export default defineConfig({
	globals: Object.fromEntries(
		Object.entries({ ...globals.browser, ...globals.node }).map(([k, v]) => [k, v ? 'writable' : 'readonly'] as const),
	),
	jsPlugins: ['@stylistic/eslint-plugin'],
	options: {
		reportUnusedDisableDirectives: 'deny',
		typeAware: true,
		typeCheck: true,
	},
	plugins: ['eslint', 'import', 'jsdoc', 'node', 'oxc', 'promise', 'typescript', 'unicorn'],
	rules: {
		'@stylistic/line-comment-position': 'deny',
		'@stylistic/padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: '*', next: '*' },
			{ blankLine: 'any', prev: ['export', 'import'], next: ['export', 'import'] },
		],
		'eslint/curly': 'deny',
	},
});
