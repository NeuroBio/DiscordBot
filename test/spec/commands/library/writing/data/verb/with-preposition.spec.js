import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('Verb.withPrepositions', () => {
	describe('constructed with an infinitive form only', () => {
		it('verb uses infinitive alone as preposition form', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb.withPrepositions()).toEqual([infinitive]);
		});
	});
	describe('constructed with one preposition', () => {
		it('verb uses infinitive with preposition as preposition form', () => {
			const infinitive = 'verb';
			const preposition = 'on';
			const verb = new Verb(infinitive, '', [ preposition ]);
			expect(verb.withPrepositions()).toEqual([`${infinitive} ${preposition}`]);
		});
	});
	describe('constructed with multiple prepositions', () => {
		it('verb uses infinitive with prepositions as preposition form', () => {
			const infinitive = 'verb';
			const preposition1 = 'on';
			const preposition2 = 'in';
			const verb = new Verb(infinitive, '', [ preposition1, preposition2 ]);
			expect(verb.withPrepositions()).toEqual([
				`${infinitive} ${preposition1}`,
				`${infinitive} ${preposition2}`,
			]);
		});
	});
});
