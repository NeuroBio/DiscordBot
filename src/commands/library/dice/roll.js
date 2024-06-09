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
			const [n, x] = nDx.split(/d|D/);
			const rolls = [];
			for (let i = 0; i < n; i++) {
				const roll = Math.floor(Math.random() * x) + 1;
				rolls.push(roll);
			}

			await interaction.reply(`${'`'}${rolls.join(' ')}${'`'}`);
		}

		super({ data, execute });
	}
}
