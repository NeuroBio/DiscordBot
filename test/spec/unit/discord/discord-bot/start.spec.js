import DiscordBot from '../../../../../src/discord/discord-bot.js';
import Fakes from '#fakes';

describe('DiscordBot.start', () => {
	const Error = Object.freeze({
		EXECUTE_FAILED: 'There was an error while executing this command.',
	});

	describe('initializing the bot', () => {
		const CommandLibraryFake = new Fakes.CommandLibrary();
		const discordFake = new Fakes.Discord();
		const token = 'token';
		beforeAll(() => {
			new DiscordBot({
				discord: discordFake,
				Configs: { main: { token } },
				CommandLibrary: CommandLibraryFake,
			}).start();
		});
		it('loads commands', () => {

		});
		it('sets all commands', () => {

		});
		it('queues an online confirmation with bot\'s name', () => {

		});
		it('logins in with the token', () => {

		});
	});
	describe('the bot client\'s callback', () => {
		describe('bot client recieves interaction that is not a chat command', () => {
			it('returns early', () => {

			});
		});
		describe('bot client recieves chat command interaction that doesn\'t match a bot command', () => {
			it('returns early', () => {

			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute succeeds
		`, () => {
			it('does nothing further', () => {

			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after initial reply
		`, () => {
			it('follows up with an error reply', () => {

			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails after deferring
		`, () => {
			it('follows up with an error reply', () => {

			});
		});
		describe(`
			bot client recieves chat command interaction that matches a bot command
			and command execute fails without responding to discord
		`, () => {
			it('replies with an error reply', () => {

			});
		});
	});
});
