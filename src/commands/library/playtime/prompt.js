import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';

export default class PromptCommand extends Command {
	constructor () {
		const data = new SlashCommandBuilder()
			.setName('prompt')
			.setDescription('To help you write.');

		const InitialArticles = Object.freeze({
			CONSONANT: 'A',
			VOWEL: 'An',
		});

		const finalToBe = Object.freeze({
			SINGULAR: 'is',
			PLURAL: 'are',
		});

		const Articles = Object.freeze([
			'one', 'any', 'the', 'some',
		]);

		async function execute (interaction) {
			const initialArticle = InitialArticles.CONSONANT;
			const mainCollectiveNoun = 'troop of';
			const adjective1 = 'unhinged';
			const optionalComma = ',';
			const adjective2 = 'dirty';
			const mainNoun = 'hinges';

			const description = `${mainCollectiveNoun} ${adjective1}${optionalComma} ${adjective2}`;
			const character = `${initialArticle} ${description} ${mainNoun}`;

			const not = 'not';
			const adverb = 'squeakily';
			const mainVerb = 'open';
			const goalArticle = Articles[0];
			const mcguffin = 'tree';
			const pluralize = '';
			const goal = `${not} ${adverb} ${mainVerb} ${goalArticle} ${mcguffin}`;


			const reasonArticle = Articles[3];
			const adjective3 = 'filthy';
			const reasonCollectiveNoun = 'cohort of';
			const motivation = 'leaves';
			const toBe = finalToBe.SINGULAR;
			const verbing = 'screaming';
			const reason = `${reasonArticle} ${reasonCollectiveNoun} ${adjective3} ${motivation} ${toBe} ${verbing}`;

			const prompt = `${character} need${pluralize} to ${goal}, because ${reason}.`;
			await interaction.reply(prompt);
		}

		super({ data, execute });
	}
}
