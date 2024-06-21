import DiscordBot from '../../../../../src/discord/discord-bot.js';
import Fakes from '#fakes';

describe('class DiscordBot construction', () => {
	it('constructs without erroring', () => {
		const CommandLibraryFake = new Fakes.CommandLibrary();
		const bot = new DiscordBot({
			discord: new Fakes.Discord(),
			Configs: { main: { token: 'token' } },
			CommandLibrary: CommandLibraryFake,
		});
		expect(bot).toEqual(jasmine.objectContaining({
			start: jasmine.any(Function),
		}));
	});
});
