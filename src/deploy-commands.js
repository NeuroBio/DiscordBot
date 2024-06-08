// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
import { REST, Routes } from 'discord.js';
import CommandLibrary from './commands/commandLibrary.js';
import Configs from './configs.js';


const { token, clientId, servers } = Configs.main;
const { devServer } = Configs.dev;

const args = getCommandLineArguments();
const serversForDeployment = getServersForDeployment({ args, servers });

const rest = new REST().setToken(token);
// the ... on await is LYING
const commands = await CommandLibrary.load({ excludedFolders: ['no-deploy'] });
const commandList = commands.map(command => command.data.toJSON());

for (const server of serversForDeployment) {
	console.log(`Deploying for server: ${server.name}.`);
	await deployCommands({ rest, commandList, server });
}


async function deployCommands({ rest, commandList, server }) {
	let data;
	console.log(`Refreshing ${commandList.length} application (/) commands.`);
	try {
		data = await rest.put(
			Routes.applicationGuildCommands(clientId, server.id),
			{ body: commandList },
		);
	}
	catch (error) {
		console.error(error);
	}
	console.log(`Reloaded ${data.length} application (/) commands.`);
}

function getCommandLineArguments() {
	const args = process.argv;
	args.shift();
	args.shift();
	const formattedArguments = {};
	for (let i = 0; i < args.length / 2; i++) {
		const index = i * 2;
		formattedArguments[args[index].replace(/-/g, '')] = args[index + 1];
	}
	return formattedArguments;
}

function getServersForDeployment({ args, servers }) {
	const serverName = args.server;
	if (!serverName) {
		const server = servers[devServer];
		return [server];
	}


	if (serverName === 'all') {
		return Object.values(servers);
	}


	const server = servers[serverName];
	if (!server) {
		throw new Error(`Server ${serverName} not found.`);
	}
	return [server];
}
