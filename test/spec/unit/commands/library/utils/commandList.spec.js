import CommandList from '../../../../../../src/commands/library/utils/commandList.js';
import Fakes from '../../../../../fakes/index.js';

describe('CommandList.execute', () => {
	it('returns all commands sorted alphabetically by name', async () => {
		const commands = [
			{ data: { name: 'C', description: 'C desc' } },
			{ data: { name: 'A', description: 'A desc' } },
			{ data: { name: 'B', description: 'B desc' } },
			{ data: { name: 'G', description: 'G desc' } },
			{ data: { name: 'D', description: 'D desc' } },
			{ data: { name: 'H', description: 'H desc' } },
			{ data: { name: 'E', description: 'E desc' } },
			{ data: { name: 'F', description: 'F desc' } },
		];
		const sortedCommands = [
			commands[1],
			commands[2],
			commands[0],
			commands[4],
			commands[6],
			commands[7],
			commands[3],
			commands[5],
		];

		const commandLibrary = new Fakes.CommandLibrary();
		commandLibrary.load.and.returnValue(commands);
		const interaction = Fakes.Interaction.create();
		await new CommandList({ commandLibrary }).execute(interaction);
		let message = 'Supported commands include...\n';

		sortedCommands.forEach(command => {
			message += `• ${'`'}/${command.data.name}${'`'}: ${command.data.description}\n`;
		});

		expect(interaction.reply).toHaveBeenCalledWith(message);
	});
});
