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
			const pokedex = await _loadPokedex();
			console.log(pokedex[0]);
			interaction.reply(pokedex.length);
		}

		async function _loadPokedex () {
			const { data } = await _axios.get('https://www.serebii.net/pokemon/nationalpokedex.shtml', { responseType: 'document' });
			const serebii = _cheerio.load(data);
			const table = serebii('main table tbody');

			const pokedex = [];
			let header = [];
			table.find('tr').each((i, row) => {
				const isHeaderRow = i === 0 || i === 1;
				if (isHeaderRow) {
					header = header.concat(_extractHeaderNames({ serebii, row }));
					return true;
				}

				const rowData = _extractRowData({ serebii, row, header });

				if (Object.keys(rowData).length === 0) {
					return true;
				}

				pokedex.push(rowData);
			});

			return pokedex;
		}

		function _extractHeaderNames ({ serebii, row }) {
			const header = [];
			serebii(row).find('td').each((j, cell) => {
				const rawText = serebii(cell).text();
				const text = rawText.replace(/(\n|\t)/g, '');
				header.push(text);
			});

			return header;
		}

		function _extractRowData ({ serebii, row, header }) {
			const rowData = {};
			serebii(row).find('td.fooinfo').each((j, cell) => {
				const rawText = serebii(cell).text();
				const text = rawText.replace(/(\n|\t)/g, '');

				if (!text || text === ' ') {
					return true;
				}
				rowData[header[j]] = text;
			});
			return rowData;
		}

		super({ data, execute });
	}
}
