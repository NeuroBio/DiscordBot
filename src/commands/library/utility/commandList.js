import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';
import CommandLibrary from '../../commandLibrary.js';

const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Lists supported bot commands.');

async function execute(interaction) {
	let message = 'Supported commands include...\n';
	let commands = await CommandLibrary
		.load({ excludedFolders: 'no-deploy' });
	commands = commands.sort((a, b) => a.data.name < b.data.name ? -1 : 0);
	commands.forEach((command) => {
		message += `• ${'`'}/${command.data.name}${'`'}: ${command.data.description}\n`;
	});
	await interaction.reply(message);
}

const command = new Command({ data, execute });
export default command;