import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { commands } from './commands/index.js'
import config from './config.json' assert { type: "json" };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
commands.forEach(command => {
	client.commands.set(command.data.name, command);	
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});



client.on(Events.InteractionCreate, async interaction => {
	console.log('worst hello world ever')
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
			await interaction.followUp({ content: 'There was an error while executing this command.', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
		}
	}
});
  

client.login(config.token);
