import { SlashCommandBuilder } from 'discord.js';
import Command from '#command';
import axios from 'axios';
import cheerio from 'cheerio';

export default class PokedexCommand extends Command {
	constructor (params = {}) {
		const _axios = params.axios || axios;
		const _cheerio = params.cheerio || cheerio;

		const data = new SlashCommandBuilder()
			.setName('pokedex')
			.setDescription('Returns pokemon data.')
			.addStringOption((option) => (option
				.setName('name')
				.setDescription('A pokemon\'s name.')
				.setRequired(false)))
			.addNumberOption((option) => option
				.setName('dex')
				.setDescription('A national pokedex number.')
				.setMinValue(1)
				.setRequired(false));

		async function execute (interaction) {
			const dex = interaction.options.getNumber('dex');
			const name = interaction.options.getString('name');

			if ((!dex && !name) || (!!dex && !!name)) {
				return await interaction.reply(`${'`'}ERROR: Send EITHER a national dex number OR a pokemon name.${'`'}`);
			}

			const pokedex = await _loadPokedex();
			let pokemon;
			if (dex) {
				const keyedDex = pokedex.reduce((dict, entry) => {
					const pokemonKey = +entry['No.'].replace('#', '');
					dict[pokemonKey] = entry;
					return dict;
				}, {});
				pokemon = keyedDex[dex];
			} else {
				const keyedDex = pokedex.reduce((dict, entry) => {
					dict[entry.Name] = entry;
					return dict;
				}, {});
				pokemon = keyedDex[name];
			}

			if (!pokemon) {
				return await interaction.reply(`${'`'}ERROR: Requested pokemon was not found.${'`'}`);
			}

			await interaction.reply(_formatMessage({ pokemon }));
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
				if (serebii(cell).attr('colspan') == 6) { // colspan is string data
					return true;
				}
				const rawText = serebii(cell).text();
				const text = rawText.replace(/(\n|\t)/g, '');
				header.push(text);
			});

			return header;
		}

		function _extractRowData ({ serebii, row, header }) {
			const rowData = {};
			serebii(row).find('td.fooinfo').each((j, cell) => {
				const rawText = serebii(cell).find('br').replaceWith(',').end().text();
				const text = rawText.replace(/(\n|\t)/g, '').replace(/\s*,/g, ', ');

				if (!text || text === ' ') {
					return true;
				}
				rowData[header[j]] = text;
			});
			return rowData;
		}

		function _formatMessage ({ pokemon }) {
			const dex = pokemon['No.'].replace('#', '').replace(/^0/, '');

			let message = '';
			message += `https://www.serebii.net/pokemon/art/${dex}.png\n`;
			message += `${'```'}${pokemon.Name} ${pokemon['No.']}\n`;
			message += `Abilities: ${pokemon.Abilities}\n`;
			message += `HP: ${pokemon.HP}\n`;
			message += `Att: ${pokemon.Att}\n`;
			message += `Def: ${pokemon.Def}\n`;
			message += `S.Att: ${pokemon['S.Att']}\n`;
			message += `S.Def: ${pokemon['S.Def']}\n`;
			message += `Spd: ${pokemon.Spd}\n${'```'}`;
			return message;
		}

		super({ data, execute });
	}
}
