import { SlashCommandBuilder } from 'discord.js';

const ping = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Quick reply to test connectivity.'),
	async execute(interaction) {
		const userName = interaction.user.globalName;
		await interaction.reply(`I'm here, ${userName}.`);
	},
};

export { ping }