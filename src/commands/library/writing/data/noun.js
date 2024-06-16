export default class Noun {
	constructor (singular, plural) {
		this.singular = singular;
		this.plural = plural ? plural : `${singular}s`;
	}
}