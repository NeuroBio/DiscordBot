import CommandLibrary from '../../../../src/commands/commandLibrary.js';
import Fakes from '../../../fakes/index.js';

describe('commandLibrary.load', () => {
	const LibraryPath = 'library';
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
			const originPath = 'originalFile';
			const dirPath = '../../test';
			fileURLToPathFake.and.returnValue(originPath);
			pathFake.dirname.and.returnValue(dirPath);

			const folderPaths = [command.folderPath];
			const filePaths = [command.filePath];
			fsFake.readdirSync
				.withArgs(`${dirPath}/${LibraryPath}`).and.returnValue(folderPaths)
				.withArgs(`${dirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths);

			const commands = await commandLibrary.load();
			expect(commands).toEqual([ command.command ]);
		});
	});
	// xdescribe('params exclude a folder', () => {
	// 	it('excludes the folder', () => {

	// 	});
	// });
});