import Verb from '../../../../../../src/commands/library/writing/data/verb.js';

describe('class Verb', () => {
	describe('construcion without arguements', () => {
		it('throws an error', () => {
			expect(() => new Verb()).toThrowError('class Verb requires an infinitive argument');
		});
	});
});
