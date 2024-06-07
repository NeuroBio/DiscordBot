// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js'
import config from './config.json' assert { type: "json" };

const { token, clientId, guildId } = config


const rest = new REST().setToken(token);
const commandList = commands.map(command => command.data.toJSON());
deployCommands({ rest, commandList });



async function deployCommands ({ rest, commandList }) {
	let data;
	console.log(`Refreshing ${commandList.length} application (/) commands.`);
	try {
		data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandList },
		);
	} catch (error) {
		console.error(error);
	}
	console.log(`Reloaded ${data.length} application (/) commands.`);
}
