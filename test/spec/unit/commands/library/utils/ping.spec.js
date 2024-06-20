import Ping from '#src/commands/library/utils/ping.js';
import Fakes from '#fakes';

describe('Ping.execute', () => {
	it('responds with the invoker\'s nickname', async () => {
		const interaction = Fakes.Interaction.create();
		await new Ping().execute(interaction);
		expect(interaction.reply).toHaveBeenCalledWith(`I'm here, ${interaction.user.globalName}.`);
	});
});
