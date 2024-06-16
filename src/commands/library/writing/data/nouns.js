class Noun {
	constructor (singular, plural) {
		this.singular = singular;
		this.plural = plural ? plural : `${singular}s`;
	}
}

const Nouns = Object.freeze([
	new Noun('vampire'),
	new Noun('hero'),
	new Noun('tree'),
	new Noun('monster'),
	new Noun('mother'),
	new Noun('lizard'),
]);

export default Nouns;
