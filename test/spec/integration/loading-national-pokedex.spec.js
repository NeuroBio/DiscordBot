import Pokedex from '#src/commands/library/fetchers/pokedex.js';
import Fakes from '#fakes';

describe('loading the national pokedex from serebii to get charmeleon', () => {
	const Param = Object.freeze({
		DEX: 'dex',
		NAME: 'name',
	});

	function _charmeleonData () {
		let data = '';
		data += 'https://www.serebii.net/pokemon/art/005.png\n';
		data += `${'```'}Charmeleon #0005\n`;
		data += 'Abilities: Blaze, Solar Power\n';
		data += 'HP: 58\n';
		data += 'Att: 64\n';
		data += 'Def: 58\n';
		data += 'S.Att: 80\n';
		data += 'S.Def: 65\n';
		data += `Spd: 80\n${'```'}`;
		return data;
	}

	it('still parses the web data correctly', async () => {
		const interaction = Fakes.Interaction.create();
		interaction.options.getNumber.withArgs(Param.DEX).and.returnValue(5);

		await new Pokedex().execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(_charmeleonData());
	});
});