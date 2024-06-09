export default class Interaction {
	static user = {
		globalName: 'test global name',
	};

	static create (params = {}) {
		return {
			user: params.user || this.user,
			reply: jasmine.createSpy('reply'),
			options: {
				getNumber: jasmine.createSpy('getNumber'),
			},
		};
	}
}
