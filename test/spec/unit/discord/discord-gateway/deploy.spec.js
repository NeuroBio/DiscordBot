import DiscordGateway from '#src/discord/discord-gateway.js';
import Fakes from '#fakes';

describe('DiscordGateway.deploy', (() => {
	const ExcludedFolder = Object.freeze({
		NO_DEPLOY: 'no-deploy',
	});
	const devConfig = { devServer: 'dev' };
	const Server = Object.freeze({
		DEV: 'dev',
		PROD: 'prod',
		OTHER: 'other',
		ALL: 'all',
	});
	const servers = Object.freeze({
		[Server.DEV]: Object.freeze({
			id: 1,
			name: 'a developer server',
		}),
		[Server.PROD]: Object.freeze({
			id: 2,
			name: 'a production server',
		}),
		[Server.OTHER]: Object.freeze({
			id: 3,
			name: 'some other server',

		}),
	});
	const token = 'token', clientId = '12345';
	let gateway, commandLibraryFake, discordFake, rest, command;

	function _createServer () {
		commandLibraryFake = new Fakes.CommandLibrary();
		discordFake = new Fakes.Discord();

		rest = new discordFake.REST();
		spyOn(discordFake, 'REST').and.returnValue(rest);
		spyOn(console, 'log');
		spyOn(console, 'error');

		command = new Fakes.Command();
		commandLibraryFake.load.and.returnValue([command]);

		gateway = new DiscordGateway({
			discord: discordFake,
			Configs: {
				main: {
					token,
					clientId,
					servers,
				},
				dev: devConfig,
			},
			commandLibrary: commandLibraryFake,
		});
	}
	describe(`
		no server param passed
		deployment completes successfully
	`, () => {
		beforeAll(async () => {
			_createServer();
			rest.put.and.returnValue([{}]);
			await gateway.deploy();
		});
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalledWith({ excludedFolders: [ExcludedFolder.NO_DEPLOY] });
		});
		it('defaults to the dev server specified in dev config for deployment', () => {
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.dev.name}.`);
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.prod.name}.`);
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.other.name}.`);
		});
		it('sets the command data into deployable form', () => {
			expect(command.data.toJSON).toHaveBeenCalled();
		});
		it('deploys the commands successfully', () => {
			expect(console.log).toHaveBeenCalledWith('Refreshing 1 application (/) commands.');
			expect(console.log).toHaveBeenCalledWith('Reloaded 1 application (/) commands.');
		});
		it('logs no errors', () => {
			expect(console.error).not.toHaveBeenCalled();
		});
	});
	describe(`
		server param for specific server passed
		deployment completes successfully
	`, () => {
		beforeAll(async () => {
			_createServer();
			rest.put.and.returnValue([{}]);
			await gateway.deploy({ server: Server.PROD });
		});
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalledWith({ excludedFolders: [ExcludedFolder.NO_DEPLOY] });
		});
		it('deploys to the server defined by params', () => {
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.dev.name}.`);
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.prod.name}.`);
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.other.name}.`);
		});
		it('sets the command data into deployable form', () => {
			expect(command.data.toJSON).toHaveBeenCalled();
		});
		it('deploys the commands successfully', () => {
			expect(console.log).toHaveBeenCalledWith('Refreshing 1 application (/) commands.');
			expect(console.log).toHaveBeenCalledWith('Reloaded 1 application (/) commands.');
		});
		it('logs no errors', () => {
			expect(console.error).not.toHaveBeenCalled();
		});
	});
	describe(`
		server param for all servers passed
		deployment completes successfully
	`, () => {
		beforeAll(async () => {
			_createServer();
			rest.put.and.returnValue([{}]);
			await gateway.deploy({ server: Server.ALL });
		});
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalledWith({ excludedFolders: [ExcludedFolder.NO_DEPLOY] });
		});
		it('deploys for all servers', () => {
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.dev.name}.`);
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.prod.name}.`);
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.other.name}.`);
		});
		it('sets the command data into deployable form', () => {
			expect(command.data.toJSON).toHaveBeenCalled();
		});
		it('deploys to the commands successfully', () => {
			expect(console.log).toHaveBeenCalledWith('Refreshing 1 application (/) commands.');
			expect(console.log).toHaveBeenCalledWith('Reloaded 1 application (/) commands.');
		});
		it('logs no errors', () => {
			expect(console.error).not.toHaveBeenCalled();
		});
	});
	describe(`
		no server param passed
		deployment throws error
	`, () => {
		const error = 'oh noes!';
		beforeAll(async () => {
			_createServer();
			rest.put.and.throwError(error);
			await gateway.deploy();
		});
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalledWith({ excludedFolders: [ExcludedFolder.NO_DEPLOY] });
		});
		it('defaults to the dev server specified in dev config for deployment', () => {
			expect(console.log).toHaveBeenCalledWith(`Deploying for server: ${servers.dev.name}.`);
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.prod.name}.`);
			expect(console.log).not.toHaveBeenCalledWith(`Deploying for server: ${servers.other.name}.`);
		});
		it('sets the command data into deployable form', () => {
			expect(command.data.toJSON).toHaveBeenCalled();
		});
		it('deploys the commands successfully', () => {
			expect(console.log).toHaveBeenCalledWith('Refreshing 1 application (/) commands.');
			expect(console.log).not.toHaveBeenCalledWith('Reloaded 1 application (/) commands.');
		});
		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith(new Error(error));
		});
	});
}));
