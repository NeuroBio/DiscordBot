import Command from '../../fakes/command.js';

export default class ExcludedCommandCopy extends Command {
	constructor () {
		super();
		this.data = { name: 'excluded' };

	}
};
