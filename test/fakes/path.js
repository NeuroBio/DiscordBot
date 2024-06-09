export default class Path {
	join = jasmine.createSpy('join', (...args) => {
		let path = args.shift();
		args.forEach((arg) => path += `/${arg}`);
		return path;
	}).and.callThrough();
	dirname = jasmine.createSpy('dirname');
}
