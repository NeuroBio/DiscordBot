import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';
import axios from 'axios';
import cheerio from 'cheerio';

export default class PokedexCommand extends Command {
	constructor (params = {}) {
		const _axios = params.axios || axios;
		const _cheerio = params.cheerio || cheerio; // you're wrong cheerio

		const data = new SlashCommandBuilder()
			.setName('pokedex')
			.setDescription('Returns pokemon data.');

		async function execute (interaction) {
			const { data } = await _axios.get('https://www.serebii.net/pokemon/nationalpokedex.shtml', { responseType: 'document' });
			const serebii = _cheerio.load(data);
			const table = serebii('main table tbody');
			const pokedex = [];
			table.find('tr').each((i, row) => {
				const rowData = {};

				serebii(row).find('td').each((j, cell) => {
					const rawText = serebii(cell).text();
					const text = rawText.replace(/(\n|\t)/g, '');
					if (!text || text === ' ') {
						return true;
					}
					rowData[j] = text;
				});

				if (!rowData[0]) {
					return true;
				}

				pokedex.push(rowData);
			});
			console.log(pokedex);
			interaction.reply(pokedex.length);
		}
		super({ data, execute });
	}
}
