import Client from './client.js';
import Collection from './collection.js';
import GatewayIntentBits from './gateway-intent-bits.js';

export default class Discord {
	Events = {
		ClientReady: 'ready',
	};
	Routes = {
		applicationGuildCommands: jasmine.createSpy('applicationGuildCommands'),
	};
	Client = Client;
	Collection = Collection;
	GatewayIntentBits = GatewayIntentBits;
};
