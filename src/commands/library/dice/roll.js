import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class VRollCommand extends Command {
	constructor () {
		const data = new SlashCommandBuilder()
			.setName('roll')
			.setDescription('Basic dice rolls.')
			.addStringOption((option) => (option
				.setName('ndx')
				.setDescription('n dice to roll with x sides')
				.setRequired(true)));

		async function execute (interaction) {
			const nDx = interaction.options.getString('ndx');

			if (!nDx.match(/^[0-9]+(d|D)[0-9]+$/)) {
				return await interaction.reply(`${'`'}ERROR: Roll request must be nDx or ndx format.${'`'}`);
			}

			const [n, x] = nDx.split(/d|D/);
			const rolls = [];
			for (let i = 0; i < n; i++) {
				const roll = Math.floor(Math.random() * x) + 1;
				rolls.push(roll);
			}

			let message = `Rolling *${nDx}*\n`;
			message += `${'`'}Raw Rolls: ${rolls.join(' ')}${'`'}\n`;
			let sum = 0;
			rolls.forEach(roll => sum += roll);
			message += `${'`'}Total: ${sum}${'`'}\n`;
			await interaction.reply(message);
		}

		super({ data, execute });
	}
}
