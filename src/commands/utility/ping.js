import { SlashCommandBuilder } from 'discord.js';


const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Quick reply to test connectivity.');

async function execute (interaction) {
	const userName = interaction.user.globalName;
	await interaction.reply(`I'm here, ${userName}.`);
}

const command = {
	data,
	execute,
};
export default command;