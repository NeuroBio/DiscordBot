import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const LibraryPath = 'library';

export default class CommandLibrary {
	#fs;
	#path;
	#fileURLToPath;

	constructor(params = {}) {
		this.#fs = params.fs || fs;
		this.#path = params.path || path;
		this.#fileURLToPath = params.fileURLToPath || fileURLToPath;
	}
	/**
	 * @typedef {Object} LoadParams
	 * @property excludedFolders {Array<string>}
	 */

	/**
	 * @param {LoadParams} params
	 * @returns {Promise<Array<Command>>}
	 */
	async load(params = {}) {
		const { excludedFolders } = params;
		const folderPath = this.#getCommandsFolderPath();
		const commandFolders = this.#fs.readdirSync(folderPath);
		const commandLibary = [];

		for (const folder of commandFolders) {
			if (excludedFolders && excludedFolders.includes(folder)) {
				continue;
			}

			const commandsPath = this.#path.join(folderPath, folder);
			const commandFiles = this.#fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = await this.#loadCommand({ file, folder });
				commandLibary.push(command);
			}
		}
		return commandLibary;
	}

	#getCommandsFolderPath() {
		const __filepath = this.#fileURLToPath(import.meta.url);
		const __dirname = this.#path.dirname(__filepath);
		return this.#path.join(__dirname, LibraryPath);
	};

	async #loadCommand({ file, folder }) {
		const relativeFilePath = `./${this.#path.join(LibraryPath, folder, file)}`;
		const exports = await import(relativeFilePath);
		const command = exports.default;
		if (command.constructor.name === 'Command') {
			return command;
		}
		else {
			throw new Error(`The command at ${relativeFilePath} must be of class Command.`);
		}
	}
}
