import CommandLibrary from '../../../../../src/commands/commandLibrary.js';
import Fakes from '#fakes';

describe('CommandLibrary.load', () => {
	const LibraryPath = 'library';
	const DirPath = '../../test';
	let commandLibrary;
	let fsFake, fileURLToPathFake, pathFake;

	beforeEach(() => {
		fsFake = new Fakes.Fs();
		fileURLToPathFake = new Fakes.Url().fileURLToPath;
		pathFake = new Fakes.Path();

		commandLibrary = new CommandLibrary({
			fs: fsFake,
			fileURLToPath: fileURLToPathFake,
			path: pathFake,
		});
	});

	describe('happy path', () => {
		it('loads a command without exploding', async () => {
			const command = Fakes.FakeLibrary.DEFAULT;

			fileURLToPathFake.and.returnValue('');
			pathFake.dirname.and.returnValue(DirPath);

			const folderPaths = [command.folderPath];
			const filePaths = [command.filePath];
			fsFake.readdirSync
				.withArgs(`${DirPath}/${LibraryPath}`).and.returnValue(folderPaths)
				.withArgs(`${DirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths);

			const commands = await commandLibrary.load();
			expect(commands.length).toBe(1);
			expect(commands[0].constructor.name).toBe(command.className);
		});
	});
	describe('params exclude a folder', () => {
		it('excludes the folder', async () => {
			const defaultCommand = Fakes.FakeLibrary.DEFAULT;
			const excludedCommand = Fakes.FakeLibrary.EXCLUDE;

			fileURLToPathFake.and.returnValue('');
			pathFake.dirname.and.returnValue(DirPath);

			const folderPaths = [defaultCommand.folderPath, excludedCommand.folderPath];
			const filePaths = [defaultCommand.filePath];
			fsFake.readdirSync
				.withArgs(`${DirPath}/${LibraryPath}`).and.returnValue(folderPaths)
				.withArgs(`${DirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths);

			const commands = await commandLibrary.load({ excludedFolders: [excludedCommand.folderPath] });
			expect(commands[0].constructor.name).toBe(defaultCommand.className);

		});
	});
	describe('non command file read', () => {
		it('throw error', async () => {
			const command = Fakes.FakeLibrary.WRONG_CLASS;

			fileURLToPathFake.and.returnValue('');
			pathFake.dirname.and.returnValue(DirPath);

			const folderPaths = [command.folderPath];
			const filePaths = [command.filePath];
			fsFake.readdirSync
				.withArgs(`${DirPath}/${LibraryPath}`).and.returnValue(folderPaths)
				.withArgs(`${DirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths);

			let actualError;
			try {
				await commandLibrary.load();
			} catch (error) {
				actualError = error;
			}
			const path = `./../../test/${LibraryPath}/${command.folderPath}/${command.filePath}`;
			expect(actualError.message).toBe(`The command at ${path} must be of class Command.`);

		});
	});
	describe('loading two commands with the same name', () => {
		it('throws error', async () => {
			const defaultCommand = Fakes.FakeLibrary.DEFAULT;
			const excludedCommand = Fakes.FakeLibrary.EXCLUDE;
			const excludedCommandCopy = Fakes.FakeLibrary.EXCLUDE_COPY;

			fileURLToPathFake.and.returnValue('');
			pathFake.dirname.and.returnValue(DirPath);

			const folderPaths = [defaultCommand.folderPath, excludedCommand.folderPath];
			const filePaths1 = [defaultCommand.filePath];
			const filePaths2 = [excludedCommand.filePath, excludedCommandCopy.filePath];
			fsFake.readdirSync
				.withArgs(`${DirPath}/${LibraryPath}`).and.returnValue(folderPaths)
				.withArgs(`${DirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths1)
				.withArgs(`${DirPath}/${LibraryPath}/${folderPaths[1]}`).and.returnValue(filePaths2);

			let actualError;
			try {
				await commandLibrary.load();
			} catch (error) {
				actualError = error;
			}

			expect(actualError.message).toBe(`Commands with duplicate names are not allowed.  Duplicated name: ${excludedCommand.name}`);
		});
	});
});