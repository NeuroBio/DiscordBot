import Noun from '../../../../../../../src/commands/library/writing/data/noun.js';

describe('class Noun', () => {
	describe('construction with no arguments', () => {
		it('throws and error', () => {
			expect(() => new Noun()).toThrowError('class Noun requires a sigular argument');
		});
	});
	describe('construction with only the singular form', () => {
		it('creates an object with a singular and generated plural form', () => {
			const singular = 'text';
			const noun = new Noun(singular);
			expect(noun).toEqual(jasmine.objectContaining({ singular, plural: `${singular}s` }));
		});
	});
	describe('construction with the singular and plural form', () => {
		it('creates an object with a singular and passed plural form', () => {
			const singular = 'text';
			const plural = 'texters';
			const noun = new Noun(singular, plural);
			expect(noun).toEqual(jasmine.objectContaining({ singular, plural }));
		});
	});
});
