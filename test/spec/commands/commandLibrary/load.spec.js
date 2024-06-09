import CommandLibrary from '../../../../src/commands/commandLibrary.js';
import Mocks from '../../../mocks/index.js';
import fakeCommand from '../../../library/folder/commandFake.js';

describe('commandLibrary.load', () => {
	const LibraryPath = 'library';
	let commandLibrary;
	let fsFake, fileURLToPathFake, pathFake;

	beforeEach(() => {
		fsFake = new Mocks.Fs();
		fileURLToPathFake = new Mocks.Url().fileURLToPath;
		pathFake = new Mocks.Path();

		commandLibrary = new CommandLibrary({
			fs: fsFake,
			fileURLToPath: fileURLToPathFake,
			path: pathFake,
		});
	});

	it('loads without exploding', async () => {
		const originPath = 'originalFile';
		const dirPath = '../../test';
		fileURLToPathFake.and.returnValue(originPath);
		pathFake.dirname.and.returnValue(dirPath);

		const folderPaths = ['folder'];
		const filePaths = ['commandFake.js'];
		fsFake.readdirSync
			.withArgs(`${dirPath}/${LibraryPath}`).and.returnValue(folderPaths)
			.withArgs(`${dirPath}/${LibraryPath}/${folderPaths[0]}`).and.returnValue(filePaths);

		const commands = await commandLibrary.load();
		expect(commands).toEqual([ fakeCommand ]);
	});
});