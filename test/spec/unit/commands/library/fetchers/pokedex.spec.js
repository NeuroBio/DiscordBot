import PokedexCommand from '../../../../../../src/commands/library/fetchers/pokedex.js';
import Fakes from '../../../../../fakes/index.js';

describe('Pokedex.execute', () => {
	const Param = Object.freeze({
		DEX: 'dex',
		NAME: 'name',
	});
	const Error = Object.freeze({
		INVALID: `${'`'}ERROR: Send EITHER a national dex number OR a pokemon name.${'`'}`,
	});
	const pokemonName = 'pokemon name';
	const pokemonDex = 23;
	const Text = Object.freeze({
		HEADER_NUM: 'No.',
		HEADER_NAME: 'Name',
		HEADER_ABILITY: 'Abilities',
		HEADER_STATS: 'Base Stats',
		BODY_NUM: `#00${pokemonDex}`,
		BODY_NAME: `${pokemonName}`,
		BODY_ABILITY: 'ability to do thing',
		BODY_STATS: '99',
	});
	const SpecialClasses = Object.freeze({
		CELL: 'fooinfo',
	});
	const pokedexHtml = `
	<html>
	<main>
	<table>
	<tbody>
	<tr><td>${Text.HEADER_NUM}</td><td>excluded</td><td>${Text.HEADER_NAME}</td></tr>
	<tr><td>${Text.HEADER_ABILITY}</td><td>${Text.HEADER_STATS}</td></tr>
	
	<tr>
	<td class="${SpecialClasses.CELL}">${Text.BODY_NUM}</td>
		<td class="${SpecialClasses.CELL}"></td>
	<td></td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_NAME}</td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_ABILITY}</td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_STATS}</td>
	</tr>
	
	</tbody>
	</table>
	</main>
	</html>
	`;

	describe('passed no parameters', () => {
		it('replies with an error', async () => {
			const axiosFake = new Fakes.Axios();
			const interaction = Fakes.Interaction.create();

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(Error.INVALID);
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
		});
	});
	describe('given a valid national dex number', () => {
		it('returns the pokemon with that id', async () => {
			const axiosFake = new Fakes.Axios();
			axiosFake.get.and.returnValue({ data: pokedexHtml });
			const interaction = Fakes.Interaction.create();
			interaction.options.getNumber.withArgs(Param.DEX).and.returnValue(pokemonDex);

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(JSON.stringify({
				[Text.HEADER_NUM]: Text.BODY_NUM,
				[Text.HEADER_NAME]: Text.BODY_NAME,
				[Text.HEADER_ABILITY]: Text.BODY_ABILITY,
				[Text.HEADER_STATS]: Text.BODY_STATS,
			}));
		});
	});
	// parse No. into a normal number ffs not #NNNN
	// requesting with pokemon name
	// pokemon not found
});