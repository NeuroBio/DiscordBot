import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class ChooseCommand extends Command {
	constructor () {

		const data = new SlashCommandBuilder()
			.setName('choose')
			.setDescription('Selects one of two choices.')
			.addStringOption((option) => (option
				.setName('choice1')
				.setDescription('The first option.')
				.setRequired(true)))
			.addStringOption((option) => (option
				.setName('choice2')
				.setDescription('The second option.')
				.setRequired(true)));

		async function execute (interaction) {
			const choice1 = interaction.options.getString('choice1');
			const choice2 = interaction.options.getString('choice2');


			let message = `Between *${choice1}* and *${choice2}*...\n`;
			const selected = Math.random() < 0.5 ? choice1 : choice2;
			message += `${'`'}${selected} was chosen.${'`'}`;
			interaction.reply(message);
		}

		super({ data, execute });
	}
}