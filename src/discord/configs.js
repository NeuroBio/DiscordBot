/* 
	Eslint does not support import assertions because they only support
	stage-4 language features.  It explodes on the asster/with keywords.
	This is a cheat to get around that. :)
*/

import config from '../../config.json' assert { type: 'json' };
import devConfig from '../../dev-config.json' assert { type: 'json' };

export default {
	main: config,
	dev: devConfig,
};
