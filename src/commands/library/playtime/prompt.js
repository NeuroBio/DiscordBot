import { SlashCommandBuilder } from 'discord.js';
import Command from '../../command.js';
import PromptData from './data/prompt.js';

export default class PromptCommand extends Command {
	constructor (params = {}) {
		const data = new SlashCommandBuilder()
			.setName('prompt')
			.setDescription('To help you write.');
		const _PromptData = params.PromptData || PromptData;
		const {
			InitialArticle,
			CollectiveNouns,
			Adjectives,
			Articles,
			Nouns,
			Adverbs,
			Verbs,
			VerbParticiples,
			FinalToBe,
		} = _PromptData;

		async function execute (interaction) {
			const initialArticle = InitialArticle.CONSONANT;
			const mainCollectiveNoun = CollectiveNouns[0];
			const adjective1 = Adjectives[0];
			const optionalComma = ',';
			const adjective2 = Adjectives[1];
			const mainNoun = Nouns[0];

			const description = `${mainCollectiveNoun} ${adjective1}${optionalComma} ${adjective2}`;
			const character = `${initialArticle} ${description} ${mainNoun}`;

			const not = 'not';
			const adverb = Adverbs[0];
			const mainVerb = Verbs[0];
			const goalArticle = Articles[0];
			const mcguffin = Nouns[1];
			const pluralize = '';
			const goal = `${not} ${adverb} ${mainVerb} ${goalArticle} ${mcguffin}`;


			const reasonArticle = Articles[1];
			const adjective3 = Adjectives[2];
			const reasonCollectiveNoun = CollectiveNouns[1];
			const motivation = Nouns[2];
			const toBe = FinalToBe.SINGULAR;
			const verbing = VerbParticiples[0];
			const reason = `${reasonArticle} ${reasonCollectiveNoun} ${adjective3} ${motivation} ${toBe} ${verbing}`;

			const prompt = `${character} need${pluralize} to ${goal}, because ${reason}.`;
			await interaction.reply(prompt);
		}

		super({ data, execute });
	}
}
