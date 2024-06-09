import VRoll from '../../../../../src/commands/library/dice/vtmRoll.js';
import Fakes from '../../../../fakes/index.js';

describe('VRoll.execute', () => {
	it('mimics ping', async () => {
		const interaction = Fakes.Interaction.create();
		await new VRoll().execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(`I'm here, ${interaction.user.globalName}.`);
	});
});
