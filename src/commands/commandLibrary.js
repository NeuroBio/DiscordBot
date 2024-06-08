import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
const LibraryPath = 'library';

async function loadCommandLibrary() {
	const folderPath = getCommandsFolderPath();
	const commandFolders = fs.readdirSync(folderPath);
	const commandLibary = [];

	for (const folder of commandFolders) {
		const commandsPath = path.join(folderPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = await loadCommand({ file, folder });
			commandLibary.push(command);
		}
	}
	return commandLibary;
}

function getCommandsFolderPath() {
	const __filepath = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filepath);
	return path.join(__dirname, LibraryPath);
}

async function loadCommand({ file, folder }) {
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

const CommandLibary = await loadCommandLibrary();
export default CommandLibary;