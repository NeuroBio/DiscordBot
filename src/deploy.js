import DiscordGateway from './discord/discord-gateway.js';
import Util from './discord/util.js';

const params = new Util().getCommandLineParams();
await new DiscordGateway().deployTo(params);
