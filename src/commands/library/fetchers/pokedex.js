import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class PokedexCommand extends Command {
	constructor () {
		const data = new SlashCommandBuilder()
			.setName('pokedex')
			.setDescription('Returns pokemon data.');

		async function execute (interaction) {
			interaction.reply('pokemon');
		}
		super({ data, execute });
	}
}
