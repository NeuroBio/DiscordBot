import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class VRollCommand extends Command {
	constructor () {
		const data = new SlashCommandBuilder()
			.setName('vroll')
			.setDescription('Rolls dice for VtM.')
			.addNumberOption((option) => (option
				.setName('white')
				.setDescription('Number of white dice to roll')
				.setMinValue(0)
				.setRequired(true)))
			.addNumberOption((option) => (option
				.setName('red')
				.setDescription('Number of red dice to roll')
				.setMinValue(0)
				.setRequired(true)))
			.addNumberOption((option) => (option
				.setName('difficulty')
				.setDescription('Number for the challenge difficulty')
				.setMinValue(1)
				.setRequired(false)));

		async function execute (interaction) {
			const white = interaction.options.getNumber('white');
			const red = interaction.options.getNumber('red');
			const difficulty = interaction.options.getNumber('difficulty');
			if (!white && !red) {
				await interaction.reply('Bring your dice to the game next time, bro.');
			}

			const whiteRolls = getRolls({ times: white });
			const redRolls = getRolls({ times: red });
			const successes = calculateSuccess({ whiteRolls, redRolls });
			const rolledCriticalSuccess = (Math.max(...redRolls) === 10);
			const rolledCriticalFailure = (Math.min(...redRolls) === 1);


			await interaction.reply(assembleResponse({
				white, red, whiteRolls, redRolls, successes, difficulty,
				rolledCriticalSuccess, rolledCriticalFailure,
			}));
		}

		function getRolls ({ times }) {
			const rolls = [];
			for (let i = 0; i < times; i++) {
				const roll = Math.floor(Math.random() * 10) + 1;
				rolls.push(roll);
			}
			return rolls;
		}
		function calculateSuccess ({ whiteRolls, redRolls }) {
			const allRolls = [...whiteRolls, ...redRolls];
			let successes = 0;
			allRolls.forEach((roll) => {
				if (roll === 10) {
					successes += 2;
				} else if (roll > 5) {
					successes += 1;
				}
			});
			return successes;
		}

		function assembleResponse (params) {
			const {
				white, red, whiteRolls, redRolls, successes, difficulty,
				rolledCriticalSuccess, rolledCriticalFailure,
			 } = params;

			let message = `Rolling ${white} regular dice and ${red} hunger dice...\n`;
			if (white > 0) {
				message += `${'`'}White: ${whiteRolls.join(' ')}${'`'}\n`;
			}
			if (red > 0) {
				message += `${'`'}Red: ${redRolls.join(' ')}${'`'}\n`;
			}

			if (!difficulty) {
				message += `**Successes:** ${successes}\n`;

				if (rolledCriticalSuccess) {
					message += 'At risk of *messy critical*...\n';
				}

				if (rolledCriticalFailure) {
					message += 'At risk of *bestial failure*.\n';
				}
				return message;
			}

			message += `**Successes:** ${successes}... `;
			if (successes < difficulty) {
				if (rolledCriticalFailure) {
					return message += 'Challenge failed. *The beast awakens.*\n';
				}
				return message += 'Challenge failed.\n';
			} else {
				if (rolledCriticalSuccess) {
					return message += 'Challenge overcome... with the beast\'s *messy* help.*\n';
				}
				return message += 'Challenge overcome.\n';
			}
		}

		super({ data, execute });
	}
}
