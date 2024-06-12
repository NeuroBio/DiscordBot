import Prompt from '../../../../../src/commands/library/playtime/prompt.js';
import Fakes from '../../../../fakes/index.js';

fdescribe('Prompt.execute', () => {

	const InitialArticle = Object.freeze({
		CONSONANT: 'A',
		VOWEL: 'An',
	});
	const CollectiveNouns = Object.freeze([
		'collective 1',
		'collective 2',
	]);
	const Adjectives = Object.freeze([
		'adj 1',
		'adj 2',
		'adj 3',
	]);
	const FinalToBe = Object.freeze({
		SINGULAR: 'singular',
		PLURAL: 'plural',
	});
	const Articles = Object.freeze([
		'art 1',
		'art 2',
	]);
	const Nouns = Object.freeze([
		'noun 1',
		'noun 2',
		'noun 3',
	]);
	const Verbs = Object.freeze([
		'verb 1',
		'verb 2',
	]);
	const Adverbs = Object.freeze([
		'adverb 1',
		'adverb 2',
	]);
	const VerbParticiples = Object.freeze([
		'verbing 1',
		'verbing 2',
	]);
	const PromptDataFake = Object.freeze({
		InitialArticle,
		CollectiveNouns,
		Adjectives,
		FinalToBe,
		Articles,
		Nouns,
		Verbs,
		Adverbs,
		VerbParticiples,
	});
	const Callers = Object.freeze({
		MAIN_COLLECTIVE: 'mainColectiveNoun',
		REASON_COLLECTIVE: 'reasonCollectiveNoun',
		ADJECTIVE_1: 'adjective1',
		ADJECTIVE_2: 'adjective2',
		ADJECTIVE_3: 'adjective3',
		SUBJECT: 'subject',
		MCGUFFIN: 'mcguffin',
		MOTIVATION: 'motivation',
		GOAL_ARTICLE: 'goalArticle',
		REASON_ARTICLE: 'reasonArticle',
		ADVERB: 'adverb',
		MAIN_VERB: 'mainVerb',
		VERBING: 'verbing',
	});

	describe(`
		happy path prompt assembly
		character is a collective noun start with a consonant
		character has two adjectives
		goal has a not
		goal has an adverb
		reason is a collective noun
		reason has a adjective
		`, () => {
		it('assembles a prompt with the correct values in the correct place', async () => {
			spyOn(Math, 'random')
				.withArgs(Callers.ADJECTIVE_2).and.returnValue(2 / 3)
				.withArgs(Callers.MCGUFFIN).and.returnValue(2 / 3)
				.withArgs(Callers.REASON_ARTICLE).and.returnValue(2 / 2)
				.withArgs(Callers.ADJECTIVE_3).and.returnValue(3 / 3)
				.withArgs(Callers.REASON_COLLECTIVE).and.returnValue(2 / 2)
				.withArgs(Callers.MOTIVATION).and.returnValue(3 / 3)
				.and.returnValue(0);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0]}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Nouns[1]}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} ${Adjectives[2]} ${Nouns[2]} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} need${'s'} to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});

});
