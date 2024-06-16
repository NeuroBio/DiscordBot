import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('class Verb construction', () => {
	describe('construcion without arguements', () => {
		it('throws an error', () => {
			expect(() => new Verb()).toThrowError('class Verb requires an infinitive argument');
		});
	});
	describe('construction with an infinitive form only', () => {
		it('constructs correctly', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb).toEqual(jasmine.objectContaining({
				ing: jasmine.any(Function),
				base: jasmine.any(Function),
				withPreposition: jasmine.any(Function),
			}));
		});
	});
	describe('construction with an infinitive and past participle', () => {
		it('constructs correctly', () => {
			const infinitive = 'verb';
			const pastParticiple = 'ving';
			const verb = new Verb(infinitive, pastParticiple);
			expect(verb).toEqual(jasmine.objectContaining({
				ing: jasmine.any(Function),
				base: jasmine.any(Function),
				withPreposition: jasmine.any(Function),
			}));
		});
	});
	describe('construction with an infinitive and preposition', () => {
		it('constructs correctly', () => {
			const infinitive = 'verb';
			const preposition = 'on';
			const verb = new Verb(infinitive, '', preposition);
			expect(verb).toEqual(jasmine.objectContaining({
				ing: jasmine.any(Function),
				base: jasmine.any(Function),
				withPreposition: jasmine.any(Function),
			}));
		});
	});
	describe('construction with an infinitive form only', () => {
		const infinitive = 'verb';
		let verb;
		beforeAll(() => {
			verb = new Verb(infinitive);
		});
		it('verb uses infinitive as base', () => {
			expect(verb.base()).toBe(infinitive);
		});
		it('verb uses default logic for present participle', () => {
			expect(verb.ing()).toBe(`${infinitive}ing`);
		});
		it('verb uses infinitive alone as preposition form', () => {
			expect(verb);
		});
	});
});
