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
			const character = createCharacter();
			const prompt = `${character} needs to ${creatGoal()}, because ${createReason()}.`;
			await interaction.reply(prompt.replace(/\s+/g, ' '));
		}

		function createCharacter () {
			const mainCollectiveNoun = getRandomEntry({ source: CollectiveNouns, chance: 0.1, caller: 'mainColectiveNoun' });
			const of = mainCollectiveNoun ? 'of' : '';
			const adjective1 = getRandomEntry({ source: Adjectives, chance: 0.8, caller: 'adjective1' });
			const adjective2 = getRandomEntry({ source: Adjectives, chance: 0.2, caller: 'adjective2' });
			const optionalComma = (adjective1 && adjective2) ? ',' : '';

			const description = `${mainCollectiveNoun} ${of} ${adjective1}${optionalComma} ${adjective2}`;

			const startsWithVowel = /^[aeiou]+/.test(description.replace(/\s+/g, ''));
			const initialArticle = startsWithVowel ? InitialArticle.VOWEL : InitialArticle.CONSONANT;

			const subjectEntry = getRandomEntry({ source: Nouns, caller: 'subject' });
			const subject = mainCollectiveNoun ? subjectEntry.plural : subjectEntry.singular;

			return `${initialArticle} ${description} ${subject}`;
		}

		function creatGoal () {
			const not = Math.random('not') <= 0.05 ? 'not' : '';
			const adverb = getRandomEntry({ source: Adverbs, chance: 0.35, caller: 'adverb' });
			const mainVerb = getRandomEntry({ source: Verbs, caller: 'mainVerb' });
			const adjective3 = getRandomEntry({ source: Adjectives, chance: 0.4, caller: 'adjective3' });

			const mcguffinEntry = getRandomEntry({ source: Nouns, caller: 'mcguffin' });
			const isSingular = (Math.random('mcguffin singular') < 0.5);
			const mcguffin = isSingular ? mcguffinEntry.singular : mcguffinEntry.plural;

			const articleSource = isSingular ? Articles.SINGULAR : Articles.PLURAL;
			const goalArticle = getRandomEntry({ source: articleSource, caller: 'goalArticle' });

			return `${not} ${adverb} ${mainVerb} ${goalArticle} ${adjective3} ${mcguffin}`;
		}

		function createReason () {
			const adjective4 = getRandomEntry({ source: Adjectives, chance: 0.4, caller: 'adjective4' });
			const reasonCollectiveNoun = getRandomEntry({ source: CollectiveNouns, chance: 0.1, caller: 'reasonCollectiveNoun' });
			const of = reasonCollectiveNoun ? 'of' : '';
			const verbing = getRandomEntry({ source: VerbParticiples, caller: 'verbing' });


			const motivationEntry = getRandomEntry({ source: Nouns, caller: 'motivation' });
			const isSingular = (!reasonCollectiveNoun && Math.random('motivation singular') < 0.5);
			const motivation = isSingular ? motivationEntry.singular : motivationEntry.plural;
			const toBe = reasonCollectiveNoun || isSingular ? FinalToBe.SINGULAR : FinalToBe.PLURAL;

			const articleSource = reasonCollectiveNoun || isSingular ? Articles.SINGULAR : Articles.PLURAL;
			const reasonArticle = getRandomEntry({ source: articleSource, caller: 'reasonArticle' });


			return `${reasonArticle} ${reasonCollectiveNoun} ${of} ${adjective4} ${motivation} ${toBe} ${verbing}`;
		}

		function getRandomEntry ({ source, chance, caller }) {
			if (chance && Math.random(caller) > chance) {
				return '';
			}

			const index = Math.floor(Math.random(caller) * (source.length - 1));
			return source[index];
		}


		super({ data, execute });
	}
}
