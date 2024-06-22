import DiscordBot from '#src/discord/discord-bot.js';
import Fakes from '#fakes';

describe('class DiscordBot construction', () => {
	const CommandLibraryFake = new Fakes.CommandLibrary();
	const discordFake = new Fakes.Discord();
	const client = new discordFake.Client();
	let bot;
	beforeAll(() => {
		spyOn(discordFake, 'Client').and.returnValue(client);
		bot = new DiscordBot({
			discord: discordFake,
			Configs: { main: { token: 'token' } },
			CommandLibrary: CommandLibraryFake,
		});

	});
	it('constructs a correctly shaped object', () => {
		expect(bot).toEqual(jasmine.objectContaining({
			start: jasmine.any(Function),
		}));
	});
	it('constructs the client correctly', () => {
		expect(discordFake.Client).toHaveBeenCalledWith({ intents: [discordFake.GatewayIntentBits.Guilds] });
		expect(client.commands).toBeInstanceOf(discordFake.Collection);
	});
});
