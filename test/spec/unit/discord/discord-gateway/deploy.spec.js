import DiscordGateway from '#src/discord/discord-gateway.js';
import Fakes from '#fakes';

describe('DiscordGateway.deploy', (() => {
	const ExcludedFolder = Object.freeze({
		NO_DEPLOY: 'no-deploy',
	});
	const token = 'token';
	let server, commandLibraryFake, discordFake, rest, command;

	function _createServer () {
		commandLibraryFake = new Fakes.CommandLibrary();
		discordFake = new Fakes.Discord();

		const rest = new discordFake.REST();
		spyOn(discordFake, 'REST').and.returnValue(rest);

		command = new Fakes.Command();
		commandLibraryFake.load.and.returnValue([command]);

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

	}
	xdescribe(`
		no server arg passed
		deployment completes successfully
	`, () => {
		beforeAll(async () => {
			_createServer();
			await server.deploy();
		});
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalledWith({ excludedFolders: [ExcludedFolder.NO_DEPLOY] });
		});
	});
}));
