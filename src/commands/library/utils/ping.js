import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class PingCommand extends Command {
	constructor() {
		const data = new SlashCommandBuilder()
			.setName('ping')
			.setDescription('Quick connectivity test.');

		async function execute(interaction) {
			const userName = interaction.user.globalName;
			await interaction.reply(`I'm here, ${userName}.`);
		}
		super({ data, execute });
	}
}
