import CommandLibrary from '../../../../src/commands/commandLibrary.js';
import Fakes from '../../../fakes/index.js';

describe('commandLibrary.load', () => {
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
			expect(commands).toEqual([ command.command ]);
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
			expect(commands).toEqual([ defaultCommand.command ]);

		});
	});
	describe('non command file read', () => {
		it('throw error', async () => {
			const command = Fakes.FakeLibrary.UNCLASSED;

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
			}
			catch (error) {
				actualError = error;
			}
			const path = `./../../test/${LibraryPath}/${command.folderPath}/${command.filePath}`;
			expect(actualError.message).toBe(`The command at ${path} must be of class Command.`);

		});
	});
});