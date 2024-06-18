import Command from '../../fakes/command.js';

export default class DefaultCommand extends Command {
	constructor () {
		super();
		this.data = { name: 'default' };
	}
};
