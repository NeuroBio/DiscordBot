import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import CommandLibrary from './commands/commandLibrary.js';
import Configs from './configs.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = await new CommandLibrary().load({ excludedFolders: ['no-deploy'] });


client.commands = new Collection();
commands.forEach((command) => {
	client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
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
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command.', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
		}
	}
});


client.login(Configs.main.token);
