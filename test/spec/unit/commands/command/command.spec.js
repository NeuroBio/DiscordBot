import Command from '#src/commands/command.js';

describe('Command.construction', () => {
	const ExpectedErrors = Object.freeze({
		NO_DATA: 'Commands require a "data" object.',
		NO_NAME: 'Command data requires a "name" property.',
		NO_EXECUTE: 'Commands require an "execute" function.',
	});

	describe('construction without data object', () => {
		it('throws an error', () => {
			expect(() => new Command()).toThrowError(ExpectedErrors.NO_DATA);
		});
	});
	describe('construction for data without name', () => {
		it('throws an error', () => {
			const data = {};
			expect(() => new Command({ data })).toThrowError(ExpectedErrors.NO_NAME);
		});
	});
	describe('construction without execution method', () => {
		it('throws an error', () => {
			const data = { name: 'name' };
			expect(() => new Command({ data })).toThrowError(ExpectedErrors.NO_EXECUTE);
		});
	});
	describe('construction with all required params', () => {
		it('makes a valid command object', () => {
			const data = { name: 'name' };
			const execute = () => {
				('shut up linter');
			};
			const command = new Command({ data, execute });
			expect(command).toEqual(jasmine.objectContaining({ data, execute }));
		});
	});
});
