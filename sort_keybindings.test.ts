import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { test, type TestContext } from 'node:test';
import { fileURLToPath } from 'node:url';

import { parse } from 'jsonc-parser';

const scriptPath = fileURLToPath(new URL('./sort_keybindings.ts', import.meta.url));

async function createDirectory(t: TestContext): Promise<string> {
	const directory = await mkdtemp(join(tmpdir(), 'sort-keybindings-'));

	t.after(async () => {
		await rm(directory, { recursive: true, force: true });
	});

	return directory;
}

await test('sorts JSONC entries, preserves comments and formatting, and is idempotent', async (t) => {
	const directory = await createDirectory(t);

	const path = join(directory, 'keybindings.json');

	const input = `// Header
[
	// Zulu
	{
		"command": "zulu",
		"key": "ctrl+z"
	},
	/* Enabled */
	{
		"command": "alpha", // Inline
		"key": "ctrl+a",
	},
	// Disabled
	{
		"command": "-alpha",
		"key": "ctrl+a"
	},
]
`;

	const expected = `// Header
[
	// Disabled
	{
		"command": "-alpha",
		"key": "ctrl+a"
	},
	/* Enabled */
	{
		"command": "alpha", // Inline
		"key": "ctrl+a",
	},
	// Zulu
	{
		"command": "zulu",
		"key": "ctrl+z"
	}
]
`;

	await writeFile(path, input);

	const result = spawnSync(process.execPath, [scriptPath, path], { encoding: 'utf8' });

	assert.equal(result.status, 0, result.stderr);

	assert.match(result.stdout, /Successfully sorted 3 keybindings/);

	assert.match(result.stdout, /Preserved 5 comments/);

	assert.equal(await readFile(path, 'utf8'), expected);

	const repeated = spawnSync(process.execPath, [scriptPath, path], { encoding: 'utf8' });

	assert.equal(repeated.status, 0, repeated.stderr);

	assert.equal(await readFile(path, 'utf8'), expected);
});

await test('uses the default path relative to the working directory', async (t) => {
	const directory = await createDirectory(t);

	const settingsDirectory = join(directory, 'settings');

	const path = join(settingsDirectory, 'keybindings.json');

	await mkdir(settingsDirectory);

	await writeFile(path, '[{"command":"z"},{"command":"a"}]');

	const result = spawnSync(process.execPath, [scriptPath], { cwd: directory, encoding: 'utf8' });

	assert.equal(result.status, 0, result.stderr);

	assert.deepEqual(parse(await readFile(path, 'utf8')), [{ command: 'a' }, { command: 'z' }]);
});

await test('reports a missing file with a nonzero exit status', async (t) => {
	const directory = await createDirectory(t);

	const result = spawnSync(process.execPath, [scriptPath, join(directory, 'missing.json')], {
		encoding: 'utf8',
	});

	assert.equal(result.status, 1);

	assert.match(result.stderr, /Error sorting keybindings:.*ENOENT/);

	assert.equal(result.stdout, '');
});

for (const input of ['not an array', '[{"command": invalid}]', '[{"command": 42}]']) {
	await test(`rejects invalid input without overwriting it: ${input}`, async (t) => {
		const directory = await createDirectory(t);

		const path = join(directory, 'invalid.json');

		await writeFile(path, input);

		const result = spawnSync(process.execPath, [scriptPath, path], { encoding: 'utf8' });

		assert.equal(result.status, 1);

		assert.match(result.stderr, /Error sorting keybindings:/);

		assert.equal(result.stdout, '');

		assert.equal(await readFile(path, 'utf8'), input);
	});
}

await test('runs directly using the Node.js shebang', async (t) => {
	const directory = await createDirectory(t);

	const path = join(directory, 'keybindings.json');

	await writeFile(path, '[]');

	const result = spawnSync(scriptPath, [path], { encoding: 'utf8' });

	assert.equal(result.status, 0, result.stderr);

	assert.match(result.stdout, /Successfully sorted 0 keybindings/);

	assert.equal(await readFile(path, 'utf8'), '[\n\n]\n');
});

await test('importing the module does not execute the CLI', async (t) => {
	const directory = await createDirectory(t);

	const scriptUrl = new URL('./sort_keybindings.ts', import.meta.url).href;

	const result = spawnSync(
		process.execPath,
		['--input-type=module', '--eval', `await import(${JSON.stringify(scriptUrl)})`],
		{
			cwd: directory,
			encoding: 'utf8',
		},
	);

	assert.equal(result.status, 0, result.stderr);

	assert.equal(result.stdout, '');

	assert.equal(result.stderr, '');
});

await test('preserves all entries in the repository keybindings file', async (t) => {
	const directory = await createDirectory(t);

	const path = join(directory, 'keybindings.json');

	const input = await readFile(new URL('./settings/keybindings.json', import.meta.url), 'utf8');

	await writeFile(path, input);

	const result = spawnSync(process.execPath, [scriptPath, path], { encoding: 'utf8' });

	assert.equal(result.status, 0, result.stderr);

	const entries: unknown = parse(input);

	const sortedEntries: unknown = parse(await readFile(path, 'utf8'));

	assert.ok(Array.isArray(entries));

	assert.ok(Array.isArray(sortedEntries));

	assert.equal(sortedEntries.length, entries.length);

	assert.deepEqual(
		sortedEntries.map((entry: unknown) => JSON.stringify(entry)).sort(),
		entries.map((entry: unknown) => JSON.stringify(entry)).sort(),
	);
});
