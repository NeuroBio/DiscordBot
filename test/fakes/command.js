export default class Command {
	#data = {
		name: 'commandName',
	};
	data = {
		...this.#data,
		toJSON: jasmine.createSpy('toJSON', () => {
			return JSON.stringify(this.#data);
		}).and.callThrough(),
	};
	execute = jasmine.createSpy('execute');
}
