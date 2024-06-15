import { SlashCommandBuilder } from 'discord.js';
import EightBallResponses from './data/eightball.js';

import Command from '../../command.js';

export default class EightBallCommand extends Command {
	constructor (params = {}) {
		const _eightBallResponses = params.EightBallResponses || EightBallResponses;
		const data = new SlashCommandBuilder()
			.setName('roll')
			.setDescription('Basic dice rolls.')
			.addStringOption((option) => (option
				.setName('question')
				.setDescription('A question needing a yes/no answer.')
				.setRequired(true)));

		const execute = (interaction) => {
			const question = interaction.options.getString('question');
			const index = Math.floor(Math.random() * _eightBallResponses.length);
			const answer = _eightBallResponses[index];

			interaction.reply(`Question: ${question}\n${answer}`);
		};

		super({ data, execute });
	}
}