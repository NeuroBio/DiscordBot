export default class Command {
	constructor (params = {}) {
		const {data, execute} = params
		if (!data) {
			throw new Error(`Commands require a "data" object.`)
		}
		if (!data.name) {
			throw new Error(`Command data requires a "name" property.`)
		}
		if (!execute) {
			throw new Error(`Commands require an "execute" function.`)
		}

		this.data = data;
		this.execute = execute;
	}
}