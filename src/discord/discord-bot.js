import discord from 'discord.js';
import CommandLibrary from '../commands/commandLibrary.js';
import Configs from '../configs.js';

export default class DiscordBot {
	#Error = Object.freeze({
		EXECUTE_FAILED: 'There was an error while executing this command.',
	});

	#Events;
	#commandLibrary;

	#Token;
	#client;

	constructor (params = {}) {
		this.#commandLibrary = params.commandLibrary || new CommandLibrary();

		const _Configs = params.Configs || Configs;
		this.#Token = _Configs.main.token;

		const _discord = params.discord || discord;
		this.#Events = _discord.Events;
		const { Client, Collection, GatewayIntentBits } = _discord;

		this.#client = new Client({ intents: [GatewayIntentBits.Guilds] });
		this.#client.commands = new Collection();
	}

	async start () {

		const commands = await this.#commandLibrary.load({ excludedFolders: ['no-deploy'] });

		commands.forEach((command) => {
			this.#client.commands.set(command.data.name, command);
		});

		this.#client.once(this.#Events.ClientReady, (readyClient) => {
			console.log(`Ready! Logged in as ${readyClient.user.tag}`);
		});


		this.#client.on(this.#Events.InteractionCreate, async interaction => {
			if (!interaction.isChatInputCommand()) {
				return;
			}
			console.log(interaction);

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matches ${interaction.commandName}.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: this.#Error.EXECUTE_FAILED, ephemeral: true });
				} else {
					await interaction.reply({ content: this.#Error.EXECUTE_FAILED, ephemeral: true });
				}
			}
		});


		this.#client.login(this.#Token);

	}
}