import Prompt from '../../../../../src/commands/library/playtime/prompt.js';
import Fakes from '../../../../fakes/index.js';

fdescribe('Prompt.execute', () => {
	it('assembles a prompt', async () => {
		const interaction = Fakes.Interaction.create();
		await new Prompt().execute(interaction);

		const character = 'character';
		const goal = 'goal';
		const reason = 'reason';
		const message = `${character} needs to ${goal}, because ${reason}.`;
		expect(interaction.reply).toHaveBeenCalledWith(message);
	});
});
