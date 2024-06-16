export default class Noun {
	constructor (singular, plural) {
		if (!singular) {
			throw new Error('class Noun requires a sigular argument');
		}
		this.singular = singular;
		this.plural = plural ? plural : `${singular}s`;
	}
}