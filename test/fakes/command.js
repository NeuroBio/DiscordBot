export default class Command {
	data = {
		name: 'commandName',
		toJSON: jasmine.createSpy('toJSON'),
	};
	execute = jasmine.createSpy('execute');
}
