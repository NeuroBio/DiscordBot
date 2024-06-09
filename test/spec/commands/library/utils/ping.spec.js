import Ping from '../../../../../src/commands/library/utils/ping.js';
import Fakes from '../../../../fakes/index.js';

describe('ping.execute', () => {
	it('responds with the invoker\'s nickname', () => {
		const interaction = Fakes.Interaction.create();
		Ping.execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(`I'm here, ${interaction.user.globalName}.`);
	});
});
