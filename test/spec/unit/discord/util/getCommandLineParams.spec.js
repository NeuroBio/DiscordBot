import Util from '#src/discord/util.js';

describe('Util.getCommandLineParams', () => {
	describe('parsing out one arg with one value', () => {
		it('creates an object with the correct name/value pairs', () => {
			const argName = 'argName';
			const argValue = 'argValue';
			process.argv = [
				'node',
				'script',
				`-${argName}`,
				argValue,
			];
			const params = new Util().getCommandLineParams();
			expect(params).toEqual({
				[argName]: argValue,
			});
		});
	});
	describe('parsing out twos args with one value each', () => {
		it('creates an object with the correct name/value pairs', () => {
			const argName1 = 'argName';
			const argValue1 = 'argValue';
			const argName2 = 'anotherName';
			const argValue2 = 'anotherValue';
			process.argv = [
				'node',
				'script',
				`-${argName1}`,
				argValue1,
				`-${argName2}`,
				argValue2,
			];
			const params = new Util().getCommandLineParams();
			expect(params).toEqual({
				[argName1]: argValue1,
				[argName2]: argValue2,
			});
		});
	});
});
