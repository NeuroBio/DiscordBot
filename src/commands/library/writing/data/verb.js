export default class Verb {
	#infinitive;
	#presentParticiple;
	#preposition;

	constructor (infinitive, presentParticiple, preposition) {
		if (!infinitive) {
			throw new Error('class Verb requires an infinitive argument');
		}

		this.#infinitive = infinitive;
		this.#presentParticiple = presentParticiple;
		this.#preposition = preposition;
	}

	withPreposition () {
		return this.#preposition ? `${this.#infinitive} ${this.#preposition}` : this.#infinitive;
	}

	base () {
		return this.#infinitive;
	}

	ing () {
		if (this.#presentParticiple) {
			return this.#presentParticiple;
		}

		const removeE = /[^aeiou]e$/.test(this.#infinitive);
		return removeE
			? `${this.#infinitive.replace(/e$/, '')}ing`
			: `${this.#infinitive}ing`;
	}
}