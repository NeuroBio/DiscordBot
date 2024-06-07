// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

import { REST, Routes } from 'discord.js';
import { commands } from './commands/index.js'
import config from './config.json' assert { type: "json" };


const { token, clientId, servers } = config;
const args = getCommandLineArguments();
const serversForDeployment = getServers({ args, servers});



const rest = new REST().setToken(token);
const commandList = commands.map(command => command.data.toJSON());

serversForDeployment.forEach(server => {
	console.log(`Deploying for server: ${server.name}.`);
	// you have async in a forloop.  That's a nono.  Look into it
	deployCommands({ rest, commandList, server });	
});



async function deployCommands ({ rest, commandList, server }) {
	let data;
	console.log(`Refreshing ${commandList.length} application (/) commands.`);
	try {
		data = await rest.put(
			Routes.applicationGuildCommands(clientId, server.id),
			{ body: commandList },
		);
	} catch (error) {
		console.error(error);
	}
	console.log(`Reloaded ${data.length} application (/) commands.`);
}

function getCommandLineArguments () {
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

function getServers ({ args, servers }) {
	const server = args.server;
	if (!server) {
		return serversForDeployment = [servers.dev];
	}


	if (server === 'all') {
		return Object.values(servers);	
	}


	const foundServer = servers[server]
	if (!foundServer) {
		throw new Error(`Server ${server} not found.`)
	}
	return serversForDeployment = [foundServer];	
}
