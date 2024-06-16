class Noun {
	constructor (singular, plural) {
		this.singular = singular;
		this.plural = plural ? plural : `${singular}s`;
	}
}
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
	Nouns: Object.freeze([
		new Noun('vampire'),
		new Noun('hero'),
		new Noun('tree'),
		new Noun('monster'),
		new Noun('mother'),
		new Noun('lizard'),
	]),
	Verbs: Object.freeze([
		'save',
		'steal',
		'defeat',
		'avoid',
		'destroy',
		'trigger',
		'spy on',
	]),
	Adjectives: Object.freeze([
		'confused',
		'stringy',
		'ominous',
		'harmony-seeking',
		'ambivalent',
		'lost',
	]),
	Adverbs: Object.freeze([
		'quickly',
		'daringly',
		'stupidly',
		'thoughtfully',
		'lovingly',
		'sadly',
	]),
	VerbParticiples: Object.freeze([
		'fleeing',
		'running out',
		'failing',
		'singing',
		'bleeding',
		'crying',
		'fuming',
		'drying',
		'simmering',
		'ending',
		'starting',
		'fighting',
		'warring',
		'dying',
		'lying',
	]),
	CollectiveNouns: Object.freeze([
		'group',
		'order',
		'parade',
		'gaggle',
		'trio',
		'band',
		'coven',
	]),
});

export default PromptData;
