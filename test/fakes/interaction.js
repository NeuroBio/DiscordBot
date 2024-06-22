export default class Interaction {
	static user = {
		globalName: 'test global name',
	};

	static create (params = {}) {
		return {
			user: params.user || this.user,
			reply: jasmine.createSpy('reply'),
			isChatInputCommand: jasmine.createSpy('isChatInputCommand'),
			followUp: jasmine.createSpy('followUp'),
			options: {
				getNumber: jasmine.createSpy('getNumber'),
				getString: jasmine.createSpy('getString'),
			},
			replied: false,
			deferred: false,
			commandName: '',
		};
	}
}
