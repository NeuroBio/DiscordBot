import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';


const data = new SlashCommandBuilder()
	.setName('vroll')
	.setDescription('Rolls dice for VtM.');

async function execute(interaction) {
	const userName = interaction.user.globalName;
	await interaction.reply(`I'm here, ${userName}.`);
}

const command = new Command({ data, execute });
export default command;