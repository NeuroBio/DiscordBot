import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('Verb.withPreposition', () => {
	describe('constructed with an infinitive form only', () => {
		it('verb uses infinitive alone as preposition form', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb.withPreposition()).toBe(infinitive);
		});
	});
	describe('constructed with one preposition', () => {
		it('verb uses infinitive with preposition as preposition form', () => {
			const infinitive = 'verb';
			const preposition = 'on';
			const verb = new Verb(infinitive, '', preposition);
			expect(verb.withPreposition()).toBe(`${infinitive} ${preposition}`);
		});
	});
});
