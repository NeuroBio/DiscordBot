import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const LibraryPath = 'library';

export default class CommandLibrary {

	/**
	 * @typedef {Object} LoadParams
	 * @property excludedFolders {Array<string>}
	 */

	/**
	 * @param {LoadParams} params
	 * @returns {Promise<Array<Command>>}
	 */
	static async load(params = {}) {
		const { excludedFolders } = params;
		const folderPath = this.#getCommandsFolderPath();
		const commandFolders = fs.readdirSync(folderPath);
		const commandLibary = [];

		for (const folder of commandFolders) {
			if (excludedFolders && excludedFolders.includes(folder)) {
				continue;
			}

			const commandsPath = path.join(folderPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = await this.#loadCommand({ file, folder });
				commandLibary.push(command);
			}
		}
		return commandLibary;
	}

	static #getCommandsFolderPath() {
		const __filepath = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filepath);
		return path.join(__dirname, LibraryPath);
	};

	static async #loadCommand({ file, folder }) {
		const relativeFilePath = `./${path.join(LibraryPath, folder, file)}`;
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
