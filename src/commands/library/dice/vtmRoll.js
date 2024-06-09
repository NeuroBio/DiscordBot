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
				.setRequired(true)))
			.addNumberOption((option) => (option
				.setName('red')
				.setDescription('Number of red dice to roll')
				.setRequired(true)))
			.addNumberOption((option) => (option
				.setName('difficulty')
				.setDescription('Number for the challenge difficulty')
				.setRequired(false)));

		async function execute (interaction) {
			const white = interaction.options.getNumber('white');
			const red = interaction.options.getNumber('red');
			if (!white && !red) {
				await interaction.reply('Bring your dice to the game next time, bro.');
			}

			const whiteRolls = getRolls({ times: white });
			const redRolls = getRolls({ times: red });
			const allRolls = [...whiteRolls, ...redRolls];
			let Successes = 0;
			allRolls.forEach((roll) => {
				if (roll === 10) {
					Successes += 2;
				} else if (roll > 5) {
					Successes += 1;
				}
			});

			let message = `Rolling ${white} dice with ${red} hunger dice...`;
			if (white > 0) {
				message += `${'`'}White: ${whiteRolls.join(' ')}${'`'}\n`;
			}
			if (red > 0) {
				message += `${'`'}Red: ${redRolls.join(' ')}${'`'}\n`;
			}
			message += `**Successes:** ${Successes}\n`;

			if (Math.max(...redRolls) === 10) {
				message += 'At risk of *messy critical*...';
			}

			if (Math.min(...redRolls) === 1) {
				message += 'At risk of *bestial failure*.';
			}

			await interaction.reply(message);
		}

		function getRolls ({ times }) {
			const rolls = [];
			for (let i = 0; i < times; i++) {
				const roll = Math.floor(Math.random() * 10) + 1;
				rolls.push(roll);
			}
			return rolls;
		}

		super({ data, execute });
	}
}
