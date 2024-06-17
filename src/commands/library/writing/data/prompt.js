import Adjectives from './adjectives.js';
import Adverbs from './adverbs.js';
import CollectiveNouns from './collective-nouns.js';
import Nouns from './nouns.js';
import Verbs from './verbs.js';

const PromptData = Object.freeze({
	InitialArticle: Object.freeze({
		CONSONANT: 'A',
		VOWEL: 'An',
	}),
	FinalToBe: Object.freeze({
		SINGULAR: 'is',
		PLURAL: 'are',
	}),
	Articles: Object.freeze({
		SINGULAR: Object.freeze(['one', 'any', 'the', 'some', 'this', 'that', 'any']),
		PLURAL: Object.freeze(['the', 'some', 'those', 'these', 'many', 'several', 'too many', 'enough', 'no', 'a few', 'each']),
	}),
	Nouns,
	CollectiveNouns,
	Adverbs,
	Adjectives,
	Verbs: Verbs.map(verb => verb.withPrepositions()[0]),
	VerbParticiples: Verbs.map(verb => verb.ing()),
});

export default PromptData;