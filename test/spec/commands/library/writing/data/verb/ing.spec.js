import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('Verb.ing', () => {
	describe('constructed with an infinitive form only', () => {
		it('verb uses default logic for present participle', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb.ing()).toBe(`${infinitive}ing`);
		});
	});
});
