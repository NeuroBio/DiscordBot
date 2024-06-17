export default class Verb {
	#infinitive;
	#presentParticiple;
	#prepositions;

	constructor (infinitive, presentParticiple, prepositions) {
		if (!infinitive) {
			throw new Error('Class Verb requires an infinitive argument.');
		}

		if (prepositions && (typeof prepositions != 'object' || prepositions.length < 1)) {
			throw new Error('When passing prepositions to class verb, they must be an array of at least one element.');
		}


		this.#infinitive = infinitive;
		this.#presentParticiple = presentParticiple;
		this.#prepositions = prepositions;
	}

	withPrepositions () {
		return this.#prepositions
			? [`${this.#infinitive} ${this.#prepositions[0]}`]
			: [this.#infinitive];
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