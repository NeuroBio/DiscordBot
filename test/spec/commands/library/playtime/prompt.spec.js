import Prompt from '../../../../../src/commands/library/playtime/prompt.js';
import Fakes from '../../../../fakes/index.js';

fdescribe('Prompt.execute', () => {

	const PromptDataFake = {
		InitialArticle: Object.freeze({
			CONSONANT: 'A',
			VOWEL: 'An',
		}),
		CollectiveNouns: Object.freeze([
			'collective 1',
			'collective 2',
		]),
		Adjectives: Object.freeze([
			'adj 1',
			'adj 2',
			'adj 3',
		]),
		FinalToBe: Object.freeze({
			SINGULAR: 'singular',
			PLURAL: 'plural',
		}),
		Articles: Object.freeze([
			'art 1',
			'art 2',
		]),
		Nouns: Object.freeze([
			'noun 1',
			'noun 2',
			'noun 3',
		]),
		Verbs: Object.freeze([
			'verb 1',
			'verb 2',
		]),
		Adverbs: Object.freeze([
			'adverb 1',
			'adverb 2',
		]),
		VerbParticiples: Object.freeze([
			'verbing 1',
			'verbing 2',
		]),
	};

	it('assembles a prompt', async () => {
		const interaction = Fakes.Interaction.create();
		spyOn(Math, 'random').and.returnValue(0);
		await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

		const character = 'character';
		const goal = 'goal';
		const reason = 'reason';
		const message = `${character} needs to ${goal}, because ${reason}.`;
		expect(interaction.reply).toHaveBeenCalledWith(message);
	});
});
