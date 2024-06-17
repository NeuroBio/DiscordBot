import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('Verb.ing', () => {
	describe('constructed with an infinitive form only for verb not ending in e', () => {
		it('appends ing to the infinitive with the e', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb.ing()).toBe(`${infinitive}ing`);
		});
	});
	describe('constructed with an infinitive form only for verb not ending [consonant] e', () => {
		it('appends ing to the infinitive without the e', () => {
			const infinitive = 'verbe';
			const verb = new Verb(infinitive);
			expect(verb.ing()).toBe('verbing');
		});
	});
	describe('constructed with an infinitive form only for verb not ending in [vowel] e', () => {
		it('appends ing to the infinitive with the e', () => {
			const infinitive = 'verbie';
			const verb = new Verb(infinitive);
			expect(verb.ing()).toBe(`${infinitive}ing`);
		});
	});
});
