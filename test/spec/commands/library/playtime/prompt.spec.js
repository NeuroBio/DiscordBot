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

	it('assembles a prompt', async () => {
		const interaction = Fakes.Interaction.create();
		spyOn(Math, 'random').and.returnValue(0);
		await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

		const description = `${CollectiveNouns[0]} ${Adjectives[0]}${','} ${Adjectives[1]}`;
		const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0]}`;
		const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Nouns[1]}`;
		const reason = `${Articles[1]} ${CollectiveNouns[1]} ${Adjectives[2]} ${Nouns[2]} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
		const message = `${character} need${'s'} to ${goal}, because ${reason}.`;
		expect(interaction.reply).toHaveBeenCalledWith(message);
	});
});
