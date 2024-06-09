import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const LibraryPath = 'library';

export default class CommandLibrary {
	#fs;
	#path;
	#fileURLToPath;

	constructor (params = {}) {
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
	async load (params = {}) {
		const { excludedFolders } = params;
		const __dirname = this.#getDirectory();
		const folderPath = this.#path.join(__dirname, LibraryPath);
		const relativeFolderPath = folderPath.replace(`${__dirname}\\`, '');
		const commandFolders = this.#fs.readdirSync(folderPath);
		const commandLibary = [];

		for (const folder of commandFolders) {
			if (excludedFolders && excludedFolders.includes(folder)) {
				continue;
			}

			const commandsPath = this.#path.join(folderPath, folder);
			const commandFiles = this.#fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = await this.#loadCommand({ relativeFolderPath, folder, file });
				commandLibary.push(command);
			}
		}
		return commandLibary;
	}

	#getDirectory () {
		const __filepath = this.#fileURLToPath(import.meta.url);
		return this.#path.dirname(__filepath);
	};

	async #loadCommand ({ relativeFolderPath, folder, file }) {
		const relativeFilePath = `./${this.#path.join(relativeFolderPath, folder, file)}`;
		const exports = await import(relativeFilePath);
		const Command = exports.default;
		const instance = new Command();
		if (Object.getPrototypeOf(instance.constructor).name === 'Command') {
			return instance;
		} else {
			throw new Error(`The command at ${relativeFilePath} must be of class Command.`);
		}
	}
}
