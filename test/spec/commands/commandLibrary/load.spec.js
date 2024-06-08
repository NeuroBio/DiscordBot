import CommandLibrary from '../../../../src/commands/commandLibrary.js';

describe('commandLibrary.load', () => {
	it('loads without exploding', async () => {
		const commands = await CommandLibrary.load();
		expect(commands).toEqual(jasmine.arrayContaining([]));
	});
});