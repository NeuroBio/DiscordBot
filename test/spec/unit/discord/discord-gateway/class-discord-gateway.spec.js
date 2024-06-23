import DiscordGateway from '#src/discord/discord-gateway.js';
import Fakes from '#fakes';

describe('class DiscordGateway construction', (() => {
	const commandLibraryFake = new Fakes.CommandLibrary();
	const discordFake = new Fakes.Discord();
	const rest = new discordFake.REST();
	const token = 'token';
	let server;
	beforeAll(() => {
		spyOn(discordFake, 'REST').and.returnValue(rest);
		server = new DiscordGateway({
			discord: discordFake,
			Configs: {
				main: {
					token,
					clientId: '12345',
					servers: [],
				},
				dev: { serverName: 'dev' },
			},
			commandLibrary: commandLibraryFake,
		});
	});
	it('constructs a correctly shaped object', () => {
		expect(server).toEqual(jasmine.objectContaining({
			deployTo: jasmine.any(Function),
		}));
	});
	it('creates a rest client with the token', () => {
		expect(rest.setToken).toHaveBeenCalledWith(token);
	});
}));
