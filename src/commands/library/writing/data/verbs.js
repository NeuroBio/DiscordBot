class Verb {
	#infinitive;
	#presentParticiple;
	#preposition;

	constructor (infinitive, presentParticiple, preposition) {
		this.#infinitive = infinitive;
		this.#presentParticiple = presentParticiple || `${infinitive.replace(/e$/, '')}ing`;
		this.#preposition = preposition;
	}

	withPreposition () {
		return this.#preposition ? `${this.#infinitive} ${this.#preposition}` : this.#infinitive;
	}

	base () {
		return this.#infinitive;
	}

	ing () {
		return this.#presentParticiple;
	}
}

const Verbs = Object.freeze([
	new Verb('save'),
	new Verb('steal'),
	new Verb('defeat'),
	new Verb('avoid'),
	new Verb('destroy'),
	new Verb('trigger'),
	new Verb('spy', '', 'on'),
	new Verb('flee', '', 'from'),
	new Verb('run', 'running'),
	new Verb('fail'),
	new Verb('sing'),
	new Verb('bleed'),
	new Verb('cry'),
	new Verb('fume'),
	new Verb('dry'),
	new Verb('simmer'),
	new Verb('start'),
	new Verb('starve'),
	new Verb('end'),
	new Verb('fight'),
	new Verb('war', 'warring'),
	new Verb('die', 'dying'),
	new Verb('lie', 'lying', 'to'),
]);

export default Verbs;
