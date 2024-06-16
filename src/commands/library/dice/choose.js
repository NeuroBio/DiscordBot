import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class ChooseCommand extends Command {
	constructor () {

		const data = new SlashCommandBuilder()
			.setName('choose')
			.setDescription('Selects one option from two choices.')
			.addStringOption((option) => (option
				.setName('option1')
				.setDescription('The first option.')
				.setRequired(true)))
			.addStringOption((option) => (option
				.setName('option2')
				.setDescription('The second option.')
				.setRequired(true)));

		async function execute (interaction) {
			const option1 = interaction.options.getString('option1');
			const option2 = interaction.options.getString('option2');


			let message = `Between *${option1}* and *${option2}*...\n`;
			const selected = Math.random() < 0.5 ? option1 : option2;
			message += `${'`'}${selected} was chosen.${'`'}`;
			interaction.reply(message);
		}

		super({ data, execute });
	}
}