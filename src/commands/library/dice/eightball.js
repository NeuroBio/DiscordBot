import { SlashCommandBuilder } from 'discord.js';
import EightBallResponses from './data/eightball.js';
import Command from '../../command.js';

export default class EightBallCommand extends Command {
	constructor (params = {}) {
		const _eightBallResponses = params.EightBallResponses || EightBallResponses;
		const data = new SlashCommandBuilder()
			.setName('eightball')
			.setDescription('Will answer all your yes/no questions...')
			.addStringOption((option) => (option
				.setName('question')
				.setDescription('A question needing a yes/no answer.')
				.setRequired(true)));

		async function execute (interaction) {
			const question = interaction.options.getString('question');
			const index = Math.floor(Math.random() * _eightBallResponses.length);
			const answer = _eightBallResponses[index];

			await interaction.reply(`Question: *${question}*\n${'`'}${answer}${'`'}`);
		};

		super({ data, execute });
	}
}