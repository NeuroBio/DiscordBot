import DiscordBot from '../../../../../src/discord/discord-bot.js';
import Fakes from '#fakes';

describe('DiscordBot.start', () => {
	const ErrorMessage = Object.freeze({
		EXECUTE_FAILED: 'There was an error while executing this command.',
	});
	const commandLibraryFake = new Fakes.CommandLibrary();
	const discordFake = new Fakes.Discord();
	const client = new discordFake.Client();
	const collection = new discordFake.Collection();
	const token = 'token';
	const command = new Fakes.Command();
	let connectedCallback;
	let interactionCallback;

	beforeAll(async () => {
		commandLibraryFake.load.and.returnValue([ command ]);
		spyOn(discordFake, 'Client').and.returnValue(client);
		spyOn(discordFake, 'Collection').and.returnValue(collection);
		spyOn(console, 'log');
		spyOn(console, 'error');
		client.once.and.callFake((event, callback) => connectedCallback = callback);
		client.on.and.callFake((event, callback) => interactionCallback = callback);

		await new DiscordBot({
			discord: discordFake,
			Configs: { main: { token } },
			commandLibrary: commandLibraryFake,
		}).start();
	});

	function _resetSpies () {
		console.log.calls.reset();
		console.error.calls.reset();
		command.execute.calls.reset();
	};

	describe('initializing the bot', () => {
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalled();
		});
		it('sets all commands', () => {
			expect(client.commands.set)
				.toHaveBeenCalledWith(command.data.name, command);
		});
		it('queues a bot connected confirmation', () => {
			expect(client.once).toHaveBeenCalledWith(discordFake.Events.ClientReady, jasmine.any(Function));
		});
		it('bot connected confirmation includes bot\'s name', async () => {
			const tag = 'bot name';
			await connectedCallback({ user: { tag } });
			expect(console.log).toHaveBeenCalledWith(`Ready! Logged in as ${tag}`);
		});
		it('queues bot interactions', () => {
			expect(client.on).toHaveBeenCalled();
		});
		it('logins in with the token', () => {
			expect(client.login).toHaveBeenCalledWith(token);
		});
	});
	// callback tests
	describe('bot client\'s login callback', () => {
		it('bot connected confirmation includes bot\'s name', async () => {
			const tag = 'bot name';
			await connectedCallback({ user: { tag } });
			expect(console.log).toHaveBeenCalledWith(`Ready! Logged in as ${tag}`);
		});
	});
	describe('bot client\'s interaction callback', () => {
		describe('bot client recieves interaction that is not a chat command', () => {
			const interaction = Fakes.Interaction.create();
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				await interactionCallback(interaction);
			});
			it('logs no errors', () => {
				expect(console.error).not.toHaveBeenCalled();
			});
			it('executes no commands', () => {
				expect(command.execute).not.toHaveBeenCalled();
			});
			it('does not respond to client', () => {
				expect(interaction.reply).not.toHaveBeenCalled();
				expect(interaction.followUp).not.toHaveBeenCalled();
			});
		});
		describe('bot client recieves chat command interaction that doesn\'t match a bot command', () => {
			const interaction = Fakes.Interaction.create();
			const commandName = 'unknown command';
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				interaction.isChatInputCommand.and.returnValue(true);
				interaction.client = client;
				interaction.commandName = commandName;

				await interactionCallback(interaction);
			});
			it('logs an error', () => {
				expect(console.error).toHaveBeenCalledWith(`No command matches ${commandName}.`);
			});
			it('executes no commands', () => {
				expect(command.execute).not.toHaveBeenCalled();
			});
			it('does not respond to client', () => {
				expect(interaction.reply).not.toHaveBeenCalled();
				expect(interaction.followUp).not.toHaveBeenCalled();
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute succeeds
		`, () => {
			const interaction = Fakes.Interaction.create();
			const commandName = 'command';
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				interaction.isChatInputCommand.and.returnValue(true);
				interaction.client = client;
				interaction.commandName = commandName;
				collection.get.withArgs(commandName).and.returnValue(command);

				await interactionCallback(interaction);
			});
			it('logs no errors', () => {
				expect(console.error).not.toHaveBeenCalled();
			});
			it('executes the command', () => {
				expect(command.execute).toHaveBeenCalledWith(interaction);
			});
			it('does not respond to client', () => {
				expect(interaction.reply).not.toHaveBeenCalled();
				expect(interaction.followUp).not.toHaveBeenCalled();
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after initial reply
		`, () => {
			const interaction = Fakes.Interaction.create();
			const commandName = 'command';
			const error = 'oh noes!';
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				interaction.isChatInputCommand.and.returnValue(true);
				interaction.client = client;
				interaction.commandName = commandName;
				collection.get.withArgs(commandName).and.returnValue(command);
				command.execute.and.callFake(() => {
					interaction.replied = true;
					throw new Error(error);
				});

				await interactionCallback(interaction);
			});
			it('log an error', () => {
				expect(console.error)
					.toHaveBeenCalledWith(jasmine.objectContaining({ message: error }));
			});
			it('executes the command', () => {
				expect(command.execute).toHaveBeenCalledWith(interaction);
			});
			it('responds to client', () => {
				expect(interaction.reply).not.toHaveBeenCalled();
				expect(interaction.followUp)
					.toHaveBeenCalledWith({ content: ErrorMessage.EXECUTE_FAILED, ephemeral: true });
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after deferring
		`, () => {
			const interaction = Fakes.Interaction.create();
			const commandName = 'command';
			const error = 'oh noes!';
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				interaction.isChatInputCommand.and.returnValue(true);
				interaction.client = client;
				interaction.commandName = commandName;
				collection.get.withArgs(commandName).and.returnValue(command);
				command.execute.and.callFake(() => {
					interaction.deferred = true;
					throw new Error(error);
				});

				await interactionCallback(interaction);
			});
			it('log an error', () => {
				expect(console.error)
					.toHaveBeenCalledWith(jasmine.objectContaining({ message: error }));
			});
			it('executes the command', () => {
				expect(command.execute).toHaveBeenCalledWith(interaction);
			});
			it('responds to client', () => {
				expect(interaction.reply).not.toHaveBeenCalled();
				expect(interaction.followUp)
					.toHaveBeenCalledWith({ content: ErrorMessage.EXECUTE_FAILED, ephemeral: true });
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails without responding to discord
		`, () => {
			const interaction = Fakes.Interaction.create();
			const commandName = 'command';
			const error = 'oh noes!';
			beforeAll(async () => {
				_resetSpies();
				interaction.isChatInputCommand.and.returnValue(false);
				interaction.isChatInputCommand.and.returnValue(true);
				interaction.client = client;
				interaction.commandName = commandName;
				collection.get.withArgs(commandName).and.returnValue(command);
				command.execute.and.throwError(error);

				await interactionCallback(interaction);
			});
			it('log an error', () => {
				expect(console.error)
					.toHaveBeenCalledWith(jasmine.objectContaining({ message: error }));
			});
			it('executes the command', () => {
				expect(command.execute).toHaveBeenCalledWith(interaction);
			});
			it('responds to client', () => {
				expect(interaction.reply)
					.toHaveBeenCalledWith({ content: ErrorMessage.EXECUTE_FAILED, ephemeral: true });
				expect(interaction.followUp).not.toHaveBeenCalled();
			});
		});
	});
});
