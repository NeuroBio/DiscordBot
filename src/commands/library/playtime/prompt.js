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
			const { character, pluralize } = createCharacter();
			const prompt = `${character} need${pluralize} to ${creatGoal()}, because ${createReason()}.`;
			await interaction.reply(prompt);
		}

		function createCharacter () {
			const mainCollectiveNoun = getRandomEntry({ source: CollectiveNouns, caller: 'mainColectiveNoun' });
			const adjective1 = getRandomEntry({ source: Adjectives, caller: 'adjective1' });
			const adjective2 = getRandomEntry({ source: Adjectives, caller: 'adjective2' });
			const optionalComma = ',';

			const description = `${mainCollectiveNoun} ${adjective1}${optionalComma} ${adjective2}`;

			const initialArticle = InitialArticle.CONSONANT;
			const pluralize = 's';
			const subject = getRandomEntry({ source: Nouns, caller: 'subject' });
			const character = `${initialArticle} ${description} ${subject}`;

			return { character, pluralize };
		}

		function creatGoal () {
			const not = 'not';
			const adverb = getRandomEntry({ source: Adverbs, caller: 'adverb' });
			const mainVerb = getRandomEntry({ source: Verbs, caller: 'mainVerb' });
			const goalArticle = getRandomEntry({ source: Articles, caller: 'goalArticle' });
			const mcguffin = getRandomEntry({ source: Nouns, caller: 'mcguffin' });
			return `${not} ${adverb} ${mainVerb} ${goalArticle} ${mcguffin}`;
		}

		function createReason () {
			const reasonArticle = getRandomEntry({ source: Articles, caller: 'reasonArticle' });
			const adjective3 = getRandomEntry({ source: Adjectives, caller: 'adjective3' });
			const reasonCollectiveNoun = getRandomEntry({ source: CollectiveNouns, caller: 'reasonCollectiveNoun' });
			const motivation = getRandomEntry({ source: Nouns, caller: 'motivation' });
			const toBe = FinalToBe.SINGULAR;
			const verbing = getRandomEntry({ source: VerbParticiples, caller: 'verbing' });
			return `${reasonArticle} ${reasonCollectiveNoun} ${adjective3} ${motivation} ${toBe} ${verbing}`;
		}

		function getRandomEntry ({ source, caller }) {
			const index = Math.floor(Math.random(caller) * (source.length - 1));
			return source[index];
		}


		super({ data, execute });
	}
}
