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
		'e collective',
	]);
	const Adjectives = Object.freeze([
		'adj 1',
		'adj 2',
		'adj 3',
		'adj 4',
		'n adj',
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
		{ singular: 'noun 1', plural: 'noun 1s' },
		{ singular: 'noun 2', plural: 'noun 2s' },
		{ singular: 'noun 2', plural: 'noun 2s' },
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
		ADJECTIVE_4: 'adjective4',
		SUBJECT: 'subject',
		MCGUFFIN: 'mcguffin',
		MCGUFFIN_SINGULAR: 'mcguffin singular',
		MOTIVATION: 'motivation',
		MOTIVATION_SINGULAR: 'motivation singular',
		GOAL_ARTICLE: 'goalArticle',
		REASON_ARTICLE: 'reasonArticle',
		ADVERB: 'adverb',
		MAIN_VERB: 'mainVerb',
		VERBING: 'verbing',
		NOT: 'not',
	});
	function setupHappyPath () {
		spyOn(Math, 'random')
			.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.11, 0)
			.withArgs(Callers.ADJECTIVE_1).and.returnValues(0.81, 0)
			.withArgs(Callers.ADJECTIVE_2).and.returnValue(2 / Adjectives.length)
			.withArgs(Callers.NOT).and.returnValue(0.951)
			.withArgs(Callers.ADVERB).and.returnValue(0.351)
			.withArgs(Callers.ADJECTIVE_3).and.returnValues(0.41, 3 / Adjectives.length)
			.withArgs(Callers.MCGUFFIN).and.returnValue(2 / Nouns.length)
			.withArgs(Callers.REASON_ARTICLE).and.returnValue(2 / Articles.length)
			.withArgs(Callers.ADJECTIVE_4).and.returnValues(0.41, 4 / Adjectives.length)
			.withArgs(Callers.REASON_COLLECTIVE).and.returnValues(0.11, 2 / CollectiveNouns.length)
			.withArgs(Callers.MOTIVATION).and.returnValue(3 / Nouns.length)
			.and.returnValue(0);
	}

	describe(`
		happy path prompt assembly (all components present)
		character is a collective noun starting with a consonant
		character has two adjectives
		goal has a not
		goal has an adverb
		reason is a collective noun
		reason has a adjective
		`, () => {
		it('assembles a prompt with the correct values in the correct place', async () => {
			setupHappyPath();

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT no not', () => {
		it('assembles a prompt without a not and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.NOT).and.returnValue(0.95);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT the character collective noun starts with a vowel', () => {
		it('assembles a prompt with the correct character article (An)', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.11, 3 / CollectiveNouns.length);


			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[2]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.VOWEL} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT character has no collective and the first adjective starts with a vowel', () => {
		it('assembles a prompt without a character collective, the correct character article (An), and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.1);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.VOWEL} ${description} ${Nouns[0].singular}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT character has no collective and the first adjective starts with a consonant', () => {
		it('assembles a prompt without a character collective, the correct character article (A), and single spaced', async () => {
			setupHappyPath();
			Math.random
				.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.1)
				.withArgs(Callers.ADJECTIVE_1).and.returnValues(0.81, 5 / Adjectives.length);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${Adjectives[4]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].singular}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT character has no collective or first adjective and the second adjective starts with a vowel', () => {
		it('assembles a prompt without a character collective, the correct character article (An), and single spaced', async () => {
			setupHappyPath();
			Math.random
				.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.1)
				.withArgs(Callers.ADJECTIVE_1).and.returnValues(0.8);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${Adjectives[1]}`;
			const character = `${InitialArticle.VOWEL} ${description} ${Nouns[0].singular}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT character has no collective or first adjective and the second adjective starts with a consonant', () => {
		it('assembles a prompt without a character collective, the correct character article (A), and single spaced', async () => {
			setupHappyPath();
			Math.random
				.withArgs(Callers.MAIN_COLLECTIVE).and.returnValues(0.1)
				.withArgs(Callers.ADJECTIVE_1).and.returnValues(0.8)
				.withArgs(Callers.ADJECTIVE_2).and.returnValues(0.21, 5 / Adjectives.length);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${Adjectives[4]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].singular}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT only the first character adjective is present', () => {
		it('assembles a prompt with one character adjective and no comma and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.ADJECTIVE_2).and.returnValue(0);


			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT only the second character adjective is present', () => {
		it('assembles a prompt with one character adjective and no comma and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.ADJECTIVE_1).and.returnValue(0);


			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT there is no adjective in the goal', () => {
		it('assembles a prompt without a adjective in the goal and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.ADJECTIVE_3).and.returnValue(0.4);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT the goal\'s noun is plural', () => {
		it('assembles a prompt with a plural noun', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.MCGUFFIN_SINGULAR).and.returnValue(0.5);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].plural}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT there is no adverb', () => {
		it('assembles a prompt without an adverb and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.ADVERB).and.returnValue(0);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT there is no collective noun in the reason', () => {
		it('assembles a prompt without a collective noun in the reason and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.REASON_COLLECTIVE).and.returnValue(0);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${Adjectives[3]} ${Nouns[2].singular} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT there is no collective noun in the reason and the reason is plural', () => {
		it('assembles a prompt without a collective noun in the reason, a plural reason and tobe, and single spaced', async () => {
			setupHappyPath();
			Math.random
				.withArgs(Callers.REASON_COLLECTIVE).and.returnValue(0)
				.withArgs(Callers.MOTIVATION_SINGULAR).and.returnValue(0.5);

			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${Adjectives[3]} ${Nouns[2].plural} ${FinalToBe.PLURAL} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
	describe('happy path prompt - EXCEPT there is no adjective in the reason', () => {
		it('assembles a prompt without a adjective in the reason and single spaced', async () => {
			setupHappyPath();
			Math.random.withArgs(Callers.ADJECTIVE_4).and.returnValue(0.4);


			const interaction = Fakes.Interaction.create();
			await new Prompt({ PromptData: PromptDataFake }).execute(interaction);

			const description = `${CollectiveNouns[0]} of ${Adjectives[0]}${','} ${Adjectives[1]}`;
			const character = `${InitialArticle.CONSONANT} ${description} ${Nouns[0].plural}`;
			const goal = `${'not'} ${Adverbs[0]} ${Verbs[0]} ${Articles[0]} ${Adjectives[2]} ${Nouns[1].singular}`;
			const reason = `${Articles[1]} ${CollectiveNouns[1]} of ${Nouns[2].plural} ${FinalToBe.SINGULAR} ${VerbParticiples[0]}`;
			const message = `${character} needs to ${goal}, because ${reason}.`;
			expect(interaction.reply).toHaveBeenCalledWith(message);
		});
	});
});
