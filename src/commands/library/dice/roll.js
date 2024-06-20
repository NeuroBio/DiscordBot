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
				return await interaction.reply(`${'`'}ERROR: Roll request must be nDx or ndx format, where both n and x are integers.${'`'}`);
			}

			const [n, x] = nDx.split(/d|D/);

			if (n == 0) { // returns as string
				return await interaction.reply('I rolled 0 dice for you.  *You\'re welcome.*');
			}

			if (x == 0) { // returns as string
				return await interaction.reply('Sorry, I left my interdimensional, sideless dice at home.');
			}

			if (x == 1) { // returns as string
				return await interaction.reply(`A d1?  *Really?*  Okay, I'll do simple addition for you: ${n}.`);
			}


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
