import CommandLibrary from '#src/commands/commandLibrary.js';

describe('integration: loading the command library', () => {
	it('loads without erroring', async () => {
		await new CommandLibrary().load();
	});
});
