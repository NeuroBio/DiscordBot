import PokedexCommand from '../../../../../src/commands/library/fetchers/pokedex.js';
import Fakes from '../../../../fakes/index.js';

describe('Pokedex.execute', () => {
	describe('given a valid national dex number', () => {
		it('returns the pokemon with that id', async () => {
			const interaction = Fakes.Interaction.create();

			await new PokedexCommand().execute(interaction);

			expect(interaction.reply).toHaveBeenCalledWith('pokemon');
		});
	});
});