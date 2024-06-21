import Fs from './fs.js';
import Path from './path.js';
import Url from './url.js';
import Command from './command.js';
import Interaction from './interaction.js';
import CommandLibrary from './commandLibrary.js';
import Axios from './axios.js';
import Discord from './discord/index.js';

// fake library
import DefaultCommand from '../library/folder/default.js';
import ExcludedCommand from '../library/folder2/exclude.js';
import NotCommand from '../library/folder/wrong-class.js';
import ExcludedCommandCopy from '../library/folder2/exclude-copy.js';

const mocks = {
	Fs,
	Path,
	Url,
	Command,
	Interaction,
	CommandLibrary,
	Axios,
	Discord,
	FakeLibrary: {
		DEFAULT: Object.freeze({
			filePath: 'default.js',
			folderPath: 'folder',
			command: DefaultCommand,
			className: 'DefaultCommand',
			name: 'default',
		}),
		EXCLUDE: Object.freeze({
			filePath: 'exclude.js',
			folderPath: 'folder2',
			command: ExcludedCommand,
			className: 'ExcludedCommand',
			name: 'excluded',
		}),
		WRONG_CLASS: Object.freeze({
			filePath: 'wrong-class.js',
			folderPath: 'folder',
			command: NotCommand,
			className: 'NotCommand',
		}),
		EXCLUDE_COPY: Object.freeze({
			filePath: 'exclude-copy.js',
			folderPath: 'folder2',
			command: ExcludedCommandCopy,
			className: 'ExcludedCommandCopy',
			name: 'excluded',
		}),
	},
};
export default mocks;
