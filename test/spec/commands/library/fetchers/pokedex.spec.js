import PokedexCommand from '../../../../../src/commands/library/fetchers/pokedex.js';
import Fakes from '../../../../fakes/index.js';

fdescribe('Pokedex.execute', () => {
	const Text = Object.freeze({
		HEADER_1: 'header 1',
		HEADER_2: 'header 2',
		HEADER_3: 'header 3',
		HEADER_4: 'header 4',
		BODY_1: 'body 1',
		BODY_2: 'body 2',
		BODY_3: 'body 3',
		BODY_4: 'body 4',
	});
	const SpecialClasses = Object.freeze({
		CELL: 'fooinfo',
	});
	const pokedexHtml = `
	<html>
	<main>
	<table>
	<tbody>
	<tr><td>${Text.HEADER_1}</td><td>${Text.HEADER_2}</td></tr>
	<tr><td>${Text.HEADER_3}</td><td>${Text.HEADER_4}</td></tr>
	<tr>
	<td class="${SpecialClasses.CELL}">${Text.BODY_1}</td>
	<td></td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_2}</td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_3}</td>
	<td class="${SpecialClasses.CELL}">${Text.BODY_4}</td>
	</tr>
	</tbody>
	</table>
	</main>
	</html>
	`;


	describe('given a valid national dex number', () => {
		it('returns the pokemon with that id', async () => {
			const axiosFake = new Fakes.Axios();
			axiosFake.get.and.returnValue({ data: pokedexHtml });
			const interaction = Fakes.Interaction.create();

			await new PokedexCommand({ axios: axiosFake }).execute(interaction);

			expect(interaction.reply).toHaveBeenCalledWith({
				[Text.HEADER_1]: Text.BODY_1,
				[Text.HEADER_2]: Text.BODY_2,
				[Text.HEADER_3]: Text.BODY_3,
				[Text.HEADER_4]: Text.BODY_4,
			});
		});
	});
});