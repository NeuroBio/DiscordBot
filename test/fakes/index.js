import Fs from './fs.js';
import Path from './path.js';
import Url from './url.js';
import Command from './command.js';
import Interaction from './interaction.js';
import CommandLibrary from './commandLibrary.js';

// fake library
import DefaultCommand from '../library/folder/default.js';
import ExcludedCommand from '../library/folder2/exclude.js';
import NotCommand from '../library/folder/wrong-class.js';

const mocks = {
	Fs,
	Path,
	Url,
	Command,
	Interaction,
	CommandLibrary,
	FakeLibrary: {
		DEFAULT: Object.freeze({
			filePath: 'default.js',
			folderPath: 'folder',
			command: DefaultCommand,
			name: 'DefaultCommand',
		}),
		EXCLUDE: Object.freeze({
			filePath: 'exclude.js',
			folderPath: 'folder2',
			command: ExcludedCommand,
			name: 'ExcludedCommand',
		}),
		WRONG_CLASS: Object.freeze({
			filePath: 'wrong-class.js',
			folderPath: 'folder',
			command: NotCommand,
			name: 'NotCommand',
		}),
	},
};
export default mocks;
