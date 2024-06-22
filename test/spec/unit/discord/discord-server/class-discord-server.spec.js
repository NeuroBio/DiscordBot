import DiscordServer from '../../../../../src/discord/discord-server.js';
import Fakes from '#fakes';

describe('class DiscordServer construction', (() => {
	const CommandLibraryFake = new Fakes.CommandLibrary();
	const discordFake = new Fakes.Discord();
	const rest = new discordFake.REST();
	const token = 'token';
	let server;
	beforeAll(() => {
		spyOn(discordFake, 'REST').and.returnValue(rest);
		server = new DiscordServer({
			discord: discordFake,
			Configs: {
				main: {
					token,
					clientId: '12345',
					servers: [],
				},
				dev: { serverName: 'dev' },
			},
			CommandLibrary: CommandLibraryFake,
		});
	});
	it('constructs a correctly shaped object', () => {
		expect(server).toEqual(jasmine.objectContaining({
			deploy: jasmine.any(Function),
		}));
	});
	it('creates a rest client with the token', () => {
		expect(rest.setToken).toHaveBeenCalledWith(token);
	});
}));
