import Pokedex from '../../../src/commands/library/fetchers/pokedex.js';
import Fakes from '../../fakes/index.js';

describe('loading the national pokedex from serebii to get charmander', () => {
	const Param = Object.freeze({
		DEX: 'dex',
		NAME: 'name',
	});
	const CharmanderData = JSON.stringify({
		'No.': '#0005',
		Name: 'Charmeleon',
		Abilities: 'Blaze Solar Power',
		'Base Stats': '58',
		HP: '64',
		Att: '58',
		Def: '80',
		'S.Att': '65',
		'S.Def': '80',
	});
	it('still parses the web data correctly', async () => {
		const interaction = Fakes.Interaction.create();
		interaction.options.getNumber.withArgs(Param.DEX).and.returnValue('#0005');
		await new Pokedex().execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(CharmanderData);
	});
});