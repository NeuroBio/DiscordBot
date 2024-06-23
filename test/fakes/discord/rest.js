export default class REST {
	setToken = jasmine.createSpy('setToken', () => this).and.callThrough();
	put = jasmine.createSpy('put');
}