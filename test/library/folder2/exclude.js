import Command from '../../fakes/command.js';

export default class ExcludedCommand extends Command {
	constructor () {
		super();
		this.data = { name: 'excluded' };

	}
};
