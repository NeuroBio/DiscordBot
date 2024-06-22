import DiscordBot from '../../../../../src/discord/discord-bot.js';
import Fakes from '#fakes';

fdescribe('DiscordBot.start', () => {
	const Error = Object.freeze({
		EXECUTE_FAILED: 'There was an error while executing this command.',
	});
	const commandLibraryFake = new Fakes.CommandLibrary();
	const discordFake = new Fakes.Discord();
	const client = new discordFake.Client();
	const collection = new discordFake.Collection();
	const token = 'token';
	const commandName = 'command';
	const commands = [{ data: { name: commandName } }];
	let connectedCallback;
	let interactionCallback;

	beforeAll(async () => {
		commandLibraryFake.load.and.returnValue(commands);
		spyOn(discordFake, 'Client').and.returnValue(client);
		spyOn(discordFake, 'Collection').and.returnValue(collection);
		spyOn(console, 'log');
		client.once.and.callFake((event, callback) => connectedCallback = callback);
		client.on.and.callFake((event, callback) => interactionCallback = callback);

		await new DiscordBot({
			discord: discordFake,
			Configs: { main: { token } },
			commandLibrary: commandLibraryFake,
		}).start();
	});

	describe('initializing the bot', () => {
		it('loads commands', () => {
			expect(commandLibraryFake.load).toHaveBeenCalled();
		});
		it('sets all commands', () => {
			expect(client.commands.set).toHaveBeenCalledWith(commandName, commands[0]);
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
	describe('bot client\'s login callback', () => {
		it('bot connected confirmation includes bot\'s name', async () => {
			const tag = 'bot name';
			await connectedCallback({ user: { tag } });
			expect(console.log).toHaveBeenCalledWith(`Ready! Logged in as ${tag}`);
		});
	});
	describe('bot client\'s interaction callback', () => {
		describe('bot client recieves interaction that is not a chat command', () => {
			it('returns early', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
		describe('bot client recieves chat command interaction that doesn\'t match a bot command', () => {
			it('returns early', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute succeeds
		`, () => {
			it('does nothing further', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after initial reply
		`, () => {
			it('follows up with an error reply', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after deferring
		`, () => {
			it('follows up with an error reply', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails without responding to discord
		`, () => {
			it('replies with an error reply', async () => {
				const interaction = Fakes.Interaction.create();
				await interactionCallback(interaction);
			});
		});
	});
});
