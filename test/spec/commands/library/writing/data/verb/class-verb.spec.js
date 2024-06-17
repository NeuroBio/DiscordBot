import Verb from '../../../../../../../src/commands/library/writing/data/verb.js';

describe('class Verb construction', () => {
	describe('construction without arguements', () => {
		it('throws an error', () => {
			expect(() => new Verb()).toThrowError('Class Verb requires an infinitive argument.');
		});
	});
	describe('construction with an infinitive form only', () => {
		it('constructs correctly', () => {
			const infinitive = 'verb';
			const verb = new Verb(infinitive);
			expect(verb).toEqual(jasmine.objectContaining({
				ing: jasmine.any(Function),
				base: jasmine.any(Function),
				withPrepositions: jasmine.any(Function),
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
				withPrepositions: jasmine.any(Function),
			}));
		});
	});
	describe('construction with an infinitive and preposition', () => {
		it('constructs correctly', () => {
			const infinitive = 'verb';
			const preposition = 'on';
			const verb = new Verb(infinitive, '', [preposition]);
			expect(verb).toEqual(jasmine.objectContaining({
				ing: jasmine.any(Function),
				base: jasmine.any(Function),
				withPrepositions: jasmine.any(Function),
			}));
		});
	});
	describe('constructed with an infinitive form and an empty preposition array', () => {
		it('throws an error', () => {
			const infinitive = 'verb';
			expect(() => new Verb(infinitive, '', [])).toThrowError('When passing prepositions to class verb, they must be an array of at least one element.');
		});
	});
	describe('constructed with an infinitive form and a preposition string', () => {
		it('throws an error', () => {
			const infinitive = 'verb';
			const preposition = 'on';
			expect(() => new Verb(infinitive, '', preposition)).toThrowError('When passing prepositions to class verb, they must be an array of at least one element.');
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
