import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);

createMainConfig();
createDevConfig();


function createMainConfig() {
	const filePath = path.join(__dirname, 'config.json');
	const template = {
		token: 'Ask me for this!',
		clientId: 'Ask me for this!',
		servers: {
			dev: {
				name: 'Snake Bucket',
				id: '1210341550568251393',
			},
			public: {
				name: 'Clone',
				id: '1210341550568251393',
			},
		},
	};
	loadOrCreate({ filePath, template });
}

function createDevConfig() {
	const filePath = path.join(__dirname, 'dev-config.json');
	const template = { devServer: 'dev' };
	loadOrCreate({ filePath, template });
}

function loadOrCreate({ filePath, template }) {
	try {
		fs.readFileSync(filePath);

	}
	// eslint-disable-next-line no-unused-vars
	catch (ignore) {
		fs.writeFileSync(filePath, JSON.stringify(template, null, 2));
	}
}