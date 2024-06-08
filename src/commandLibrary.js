import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

async function loadCommandLibrary () {
	const folderPath = getCommandsFolderPath();
	const commandFolders = fs.readdirSync(folderPath);
	const commandLibary = []

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

function getCommandsFolderPath () {
	const __filepath = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filepath);
	return path.join(__dirname, 'commands');
}

async function loadCommand ({ file, folder }) {
	const relativeFilePath = `./${path.join('commands', folder, file)}`;
	const exports = await import(relativeFilePath);
	const command = exports.default;
	if ('data' in command && 'execute' in command) {
		return command;
	} else {
		throw new Error(`The command at ${relativeFilePath} is missing a required "data" or "execute" property.`);
	}
}

const commandLibary = await loadCommandLibrary();
export default commandLibary;