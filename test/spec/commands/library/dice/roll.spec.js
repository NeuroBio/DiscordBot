import Roll from '../../../../../src/commands/library/dice/roll.js';
import Fakes from '../../../../fakes/index.js';

describe ('Roll.execute', () => {
	describe('rolling 6d10', () => {
		it('returns the raw rolls', async () => {
			const nDx = '6d10';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs('ndx').and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0, 0.2, 0.4, 0.6, 0.8, 0.999);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(`${'`'}1 3 5 7 9 10${'`'}`);
		});
	});
	describe('rolling 1D6', () => {
		it('returns the raw rolls', async () => {
			const nDx = '1D6';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs('ndx').and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0.51);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(`${'`'}4${'`'}`);
		});
	});
	describe('rolling 2D20', () => {
		it('returns the raw rolls', async () => {
			const nDx = '2D20';
			const interaction = Fakes.Interaction.create();
			interaction.options.getString.withArgs('ndx').and.returnValue(nDx);
			spyOn(Math, 'random').and.returnValues(0.46, 0.73);

			await new Roll().execute(interaction);
			expect(interaction.reply).toHaveBeenCalledWith(`${'`'}10 15${'`'}`);
		});
	});
});