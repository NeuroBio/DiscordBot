export default class Util {
	getCommandLineParams () {
		const args = process.argv;
		args.shift();
		args.shift();
		const formattedArguments = {};
		for (let i = 0; i < args.length / 2; i++) {
			const index = i * 2;
			formattedArguments[args[index].replace(/-/g, '')] = args[index + 1];
		}
		return formattedArguments;
	}
};
