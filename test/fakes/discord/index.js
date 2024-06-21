import Client from './client.js';
import Collection from './collection.js';
import GatewayIntentBits from './gateway-intent-bits.js';

export default class Discord {
	Events = {};
	Client = Client;
	Collection = Collection;
	GatewayIntentBits = GatewayIntentBits;
};
