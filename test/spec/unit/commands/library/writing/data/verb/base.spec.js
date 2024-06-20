import Verb from '../../../../../../../../src/commands/library/writing/data/verb.js';

describe('Verb.base', () => {
	describe('constructed with an infinitive form only', () => {
		it('verb uses infinitive as base', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb.base()).toBe(infinitive);
		});
	});
});
