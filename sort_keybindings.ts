#!/usr/bin/env -S deno run --allow-read --allow-write

import { parse } from "jsr:@std/jsonc";

// Constants for consistent formatting
const INDENTATION = {
	COMMENT: "\t",
	OBJECT_BRACE: "\t",
	PROPERTY: "\t\t",
} as const;

const REGEX_PATTERNS = {
	ENTRY: /((?:\s*(?:\/\/.*|\/\*[\s\S]*?\*\/)\s*)*)\s*(\{[\s\S]*?\})/g,
	BEFORE_ARRAY: /^[\s\S]*?(?=\[)/,
	ARRAY_CONTENT: /\[([\s\S]*)\]/,
	OBJECTS: /\{[\s\S]*?\}/g,
	COMMENTS: /\/\/|\/\*/g,
} as const;

// Type definitions
interface KeybindingEntry {
	text: string;
	command: string;
}

interface ProcessingStats {
	entryCount: number;
	commentCount: number;
}

/**
 * Extracts the content before the keybindings array
 */
function extractBeforeArrayContent(content: string): string {
	return content.match(REGEX_PATTERNS.BEFORE_ARRAY)?.[0] || "";
}

/**
 * Extracts the array content between [ and ]
 */
function extractArrayContent(content: string): string {
	const arrayMatch = content.match(REGEX_PATTERNS.ARRAY_CONTENT);

	if (!arrayMatch) {
		throw new Error("No keybindings array found");
	}

	return arrayMatch[1];
}

/**
 * Parses keybinding entries from array content
 */
function parseKeybindingEntries(arrayContent: string): KeybindingEntry[] {
	const entries: KeybindingEntry[] = [];
	let match;

	while ((match = REGEX_PATTERNS.ENTRY.exec(arrayContent)) !== null) {
		const [, comments, objectText] = match;

		try {
			const obj = parse(objectText) as Record<string, unknown>;
			const command = String(obj.command || "");

			entries.push({
				text: (comments + objectText).trim(),
				command,
			});
		} catch {
			// Skip invalid entries
		}
	}

	return entries;
}

/**
 * Compares two keybinding commands for sorting
 */
function compareKeybindingCommands(
	a: KeybindingEntry,
	b: KeybindingEntry
): number {
	const baseA = a.command.startsWith("-") ? a.command.slice(1) : a.command;
	const baseB = b.command.startsWith("-") ? b.command.slice(1) : b.command;
	const baseComparison = baseA.localeCompare(baseB);

	if (baseComparison !== 0) return baseComparison;
	if (a.command.startsWith("-") && !b.command.startsWith("-")) return -1;
	if (!a.command.startsWith("-") && b.command.startsWith("-")) return 1;

	return 0;
}

/**
 * Applies proper indentation to a line based on its content
 */
function applyIndentation(line: string): string {
	const trimmed = line.trim();

	if (!trimmed) return "";

	if (trimmed.startsWith("//") || trimmed.startsWith("/*")) {
		return `${INDENTATION.COMMENT}${trimmed}`;
	}

	if (trimmed === "{" || trimmed === "}") {
		return `${INDENTATION.OBJECT_BRACE}${trimmed}`;
	}

	return `${INDENTATION.PROPERTY}${trimmed}`;
}

/**
 * Normalizes indentation for a keybinding entry
 */
function normalizeEntryIndentation(entry: KeybindingEntry): string {
	const lines = entry.text.split("\n");
	const normalizedLines = lines.map(applyIndentation);

	return normalizedLines.join("\n");
}

/**
 * Calculates processing statistics from content
 */
function calculateStats(content: string): ProcessingStats {
	const entryCount = (content.match(REGEX_PATTERNS.OBJECTS) || []).length;
	const commentCount = (content.match(REGEX_PATTERNS.COMMENTS) || []).length;

	return { entryCount, commentCount };
}

/**
 * Extracts and sorts keybinding entries while preserving comments
 */
function sortKeybindingsWithComments(content: string): string {
	// Extract everything before the array
	const beforeArray = extractBeforeArrayContent(content);

	// Extract and parse keybinding entries
	const arrayContent = extractArrayContent(content);
	const entries = parseKeybindingEntries(arrayContent);

	// Sort entries by command
	entries.sort(compareKeybindingCommands);

	// Reconstruct the file with normalized indentation
	const sortedEntries = entries
		.map((entry, i) => {
			const normalized = normalizeEntryIndentation(entry);
			return i < entries.length - 1 ? `${normalized},` : normalized;
		})
		.join("\n");

	return `${beforeArray}[\n${sortedEntries}\n]\n`;
}

/**
 * Sorts VS Code keybindings.json by command property while preserving comments
 */
async function sortKeybindings(filePath: string): Promise<void> {
	try {
		const content = await Deno.readTextFile(filePath);
		const sortedContent = sortKeybindingsWithComments(content);

		await Deno.writeTextFile(filePath, sortedContent);

		// Calculate and report processing statistics
		const stats = calculateStats(content);

		console.log(
			`✅ Successfully sorted ${stats.entryCount} keybindings by command property`
		);

		if (stats.commentCount > 0) {
			console.log(`💬 Preserved ${stats.commentCount} comments`);
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);

		console.error("❌ Error sorting keybindings:", errorMessage);

		Deno.exit(1);
	}
}

// Main execution
if (import.meta.main) {
	const filePath = Deno.args[0] || "./settings/keybindings.json";

	await sortKeybindings(filePath);
}
