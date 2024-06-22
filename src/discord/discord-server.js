import discord from 'discord.js';
import CommandLibrary from '../commands/commandLibrary.js';
import Configs from '../configs.js';

export default class DiscordServer {

	#clientId;
	#servers;
	#devServer;
	#commandLibrary;
	#Routes;

	#rest;

	constructor (params = {}) {
		this.#commandLibrary = params.commandLibrary || new CommandLibrary();
		const _discord = params.discord || discord;
		this.#Routes = _discord.Routes;

		const _Configs = params.Configs || Configs;
		const token = _Configs.main.token;
		this.#clientId = _Configs.main.clientId;
		this.#servers = _Configs.main.servers;
		this.#devServer = _Configs.dev.devServer;

		this.#rest = new _discord.REST().setToken(token);
	}


	async deploy (params = {}) {
		params = this.#getCommandLineArguments();
		const serversForDeployment = this.#getServersForDeployment(params);

		const commands = await this.#commandLibrary.load({ excludedFolders: ['no-deploy'] });
		const commandList = commands.map(command => command.data.toJSON());

		for (const server of serversForDeployment) {
			console.log(`Deploying for server: ${server.name}.`);
			await this.#deployCommands({ commandList, server });
		}
	}


	async #deployCommands ({ commandList, server }) {
		let data;
		console.log(`Refreshing ${commandList.length} application (/) commands.`);
		try {
			data = await this.#rest.put(
				this.#Routes.applicationGuildCommands(this.#clientId, server.id),
				{ body: commandList },
			);
		} catch (error) {
			console.error(error);
		}
		console.log(`Reloaded ${data.length} application (/) commands.`);
	}

	#getCommandLineArguments () {
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

	#getServersForDeployment ({ server: serverName }) {
		if (!serverName) {
			const server = this.#servers[this.#devServer];
			return [server];
		}


		if (serverName === 'all') {
			return Object.values(this.#servers);
		}


		const server = this.#servers[serverName];
		if (!server) {
			throw new Error(`Server ${serverName} not found.`);
		}
		return [server];
	}
}
