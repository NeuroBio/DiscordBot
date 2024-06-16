export default class Verb {
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