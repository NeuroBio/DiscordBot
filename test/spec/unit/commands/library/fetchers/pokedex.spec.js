import PokedexCommand from '#src/commands/library/fetchers/pokedex.js';
import Fakes from '#fakes';

describe('Pokedex.execute', () => {
	const Param = Object.freeze({
		DEX: 'dex',
		NAME: 'name',
	});
	const Error = Object.freeze({
		INVALID: `${'`'}ERROR: Send EITHER a national dex number OR a pokemon name.${'`'}`,
		NOT_FOUND: `${'`'}ERROR: Requested pokemon was not found.${'`'}`,
	});
	const pokemonName = 'pokemon name';
	const pokemonDex = 23;
	const Text = Object.freeze({
		HEADER_NUM: 'No.',
		HEADER_NAME: 'Name',
		HEADER_ABILITY: 'Abilities',
		HEADER_HP: 'HP',
		HEADER_ATT: 'Att',
		HEADER_DEF: 'Def',
		HEADER_SATT: 'S.Att',
		HEADER_SDEF: 'S.Def',
		HEADER_SPD: 'Spd',
		BODY_NUM: `#00${pokemonDex}`,
		BODY_NAME: `${pokemonName}`,
		BODY_ABILITY_1: 'thing',
		BODY_ABILITY_2: 'other thing',
		BODY_ABILITY_3: 'third thing',
		BODY_HP: '1',
		BODY_ATT: '2',
		BODY_DEF: '3',
		BODY_SATT: '4',
		BODY_SDEF: '5',
		BODY_SPD: '6',
	});
	const SpecialClasses = Object.freeze({
		CELL: 'fooinfo',
	});
	const pokedexHtml = `
	<html>
	<main>
	<table>
	<tbody>
	<tr>
		<td>${Text.HEADER_NUM}</td>
		<td>excluded</td>
		<td>${Text.HEADER_NAME}</td>
		<td>${Text.HEADER_ABILITY}</td>
	</tr>
	<tr>
		<td colspan="6">excluded</td>
		<td>${Text.HEADER_HP}</td>
		<td>${Text.HEADER_ATT}</td>
		<td>${Text.HEADER_DEF}</td>
		<td>${Text.HEADER_SATT}</td>
		<td>${Text.HEADER_SDEF}</td>
		<td>${Text.HEADER_SPD}</td>
	</tr>
	<tr>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}"></td>
		<td></td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">
			<a>no</a>
			<br>
			<a>no</a>
		</td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">no</td>
		<td class="${SpecialClasses.CELL}">no</td>
	</tr>
	<tr>
		<td class="${SpecialClasses.CELL}">${Text.BODY_NUM}</td>
		<td class="${SpecialClasses.CELL}"></td>
		<td></td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_NAME}</td>
		<td class="${SpecialClasses.CELL}">
			<a>${Text.BODY_ABILITY_1}</a>
			<br>
			<a>${Text.BODY_ABILITY_2}</a>
			<br>
			<a>${Text.BODY_ABILITY_3}</a>
		</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_HP}</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_ATT}</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_DEF}</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_SATT}</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_SDEF}</td>
		<td class="${SpecialClasses.CELL}">${Text.BODY_SPD}</td>
	</tr>
	
	</tbody>
	</table>
	</main>
	</html>
	`;

	function _formatResult () {
		let data = '';
		data += `https://www.serebii.net/pokemon/art/0${pokemonDex}.png\n`;
		data += `${'```'}${Text.BODY_NAME} ${Text.BODY_NUM}\n`;
		data += `Abilities: ${Text.BODY_ABILITY_1}, ${Text.BODY_ABILITY_2}, ${Text.BODY_ABILITY_3}\n`;
		data += `HP: ${Text.BODY_HP}\n`;
		data += `Att: ${Text.BODY_ATT}\n`;
		data += `Def: ${Text.BODY_DEF}\n`;
		data += `S.Att: ${Text.BODY_SATT}\n`;
		data += `S.Def: ${Text.BODY_SDEF}\n`;
		data += `Spd: ${Text.BODY_SPD}\n${'```'}`;
		return data;
	}

	describe('passed no parameters', () => {
		it('replies with an error', async () => {
			const axiosFake = new Fakes.Axios();
			const interaction = Fakes.Interaction.create();

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('passed both parameters', () => {
		it('replies with an error', async () => {
			const axiosFake = new Fakes.Axios();
			const interaction = Fakes.Interaction.create();
			interaction.options.getNumber.withArgs(Param.DEX).and.returnValue(pokemonDex);
			interaction.options.getString.withArgs(Param.NAME).and.returnValue(pokemonName);

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	describe('given a valid national dex number', () => {
		it('returns the pokemon with that id', async () => {
			const axiosFake = new Fakes.Axios();
			axiosFake.get.and.returnValue({ data: pokedexHtml });
			const interaction = Fakes.Interaction.create();
			interaction.options.getNumber.withArgs(Param.DEX).and.returnValue(pokemonDex);

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(_formatResult());
		});
	});
	describe('given a valid name', () => {
		it('returns the pokemon with that name', async () => {
			const axiosFake = new Fakes.Axios();
			axiosFake.get.and.returnValue({ data: pokedexHtml });
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs(Param.NAME).and.returnValue(pokemonName);

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(_formatResult());
		});
	});
	describe('given a valid national dex number and pokemon not found', () => {
		it('replies with an error', async () => {
			const dex = 432;
			const axiosFake = new Fakes.Axios();
			axiosFake.get.and.returnValue({ data: pokedexHtml });
			const interaction = Fakes.Interaction.create();
			interaction.options.getNumber.withArgs(Param.DEX).and.returnValue(dex);

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.NOT_FOUND);
			expect(interaction.reply).toHaveBeenCalledTimes(1);
		});
	});
	// requesting with pokemon name
});