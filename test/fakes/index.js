import Fs from './fs.js';
import Path from './path.js';
import Url from './url.js';
import Command from './command.js';
import defaultCommandFake from '../library/folder/default.js';
import excludedCommandFake from '../library/folder2/exclude.js';
import unclassedCommandFake from '../library/folder/unclassed.js';

const mocks = {
	Fs,
	Path,
	Url,
	Command,
	FakeLibrary: {
		DEFAULT: {
			filePath: 'default.js',
			folderPath: 'folder',
			command: defaultCommandFake,
		},
		EXCLUDE: {
			filePath: 'exclude.js',
			folderPath: 'folder2',
			command: excludedCommandFake,
		},
		UNCLASSED: {
			filePath: 'unclassed.js',
			folderPath: 'folder',
			command: unclassedCommandFake,
		},
	},
};
export default mocks;