import ChooseCommand from '#src/commands/library/dice/choose.js';
import Fakes from '#fakes';

describe('Choose.execute', () => {
	const Param = Object.freeze({
		X: 'choice1',
		Y: 'choice2',
	});
	describe('first option chosen', () => {
		it('repeats the choices and claims the first option', async () => {
			const option1 = 'chips and salsa';
			const option2 = 'parfait';

			const interaction = Fakes.Interaction.create();
			interaction.options.getString
				.withArgs(Param.X).and.returnValue(option1)
				.withArgs(Param.Y).and.returnValue(option2);

			spyOn(Math, 'random').and.returnValues(0);

			await new ChooseCommand().execute(interaction);
			const choices = `Between *${option1}* and *${option2}*...\n`;
			const result = `${'`'}${option1} was chosen.${'`'}`;
			expect(interaction.reply).toHaveBeenCalledWith(`${choices}${result}`);
		});
	});
	describe('second option chosen', () => {
		it('repeats the choices and claims the second option', async () => {
			const option1 = 'chips and salsa';
			const option2 = 'parfait';

			const interaction = Fakes.Interaction.create();
			interaction.options.getString
				.withArgs(Param.X).and.returnValue(option1)
				.withArgs(Param.Y).and.returnValue(option2);

			spyOn(Math, 'random').and.returnValues(0.5);

			await new ChooseCommand().execute(interaction);
			const choices = `Between *${option1}* and *${option2}*...\n`;
			const result = `${'`'}${option2} was chosen.${'`'}`;
			expect(interaction.reply).toHaveBeenCalledWith(`${choices}${result}`);
		});
	});
});
