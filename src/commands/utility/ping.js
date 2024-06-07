import { SlashCommandBuilder } from 'discord.js';

const ping = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const userName = interaction.user.globalName;
		await interaction.reply(`I'm here, ${userName}.`);
	},
};

export { ping }