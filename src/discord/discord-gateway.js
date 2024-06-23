import discord from 'discord.js';
import CommandLibrary from '#src/commands/commandLibrary.js';
import Configs from './configs.js';

export default class DiscordGateway {

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


	async deployTo (params = {}) {
		const serversForDeployment = this.#getServersForDeployment(params);

		const commands = await this.#commandLibrary.load({ excludedFolders: ['no-deploy'] });
		const commandList = commands.map(command => command.data.toJSON());

		for (const server of serversForDeployment) {
			console.log(`Deploying for server: ${server.name}.`);
			await this.#deployCommands({ commandList, server });
		}
	}


	async #deployCommands ({ commandList, server }) {
		console.log(`Refreshing ${commandList.length} application (/) commands.`);
		try {
			const data = await this.#rest.put(
				this.#Routes.applicationGuildCommands(this.#clientId, server.id),
				{ body: commandList },
			);
			console.log(`Reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(error);
		}
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
