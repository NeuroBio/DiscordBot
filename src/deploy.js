import DiscordGateway from './discord/discord-gateway.js';
import Util from './discord/util.js';

const util = new Util();
const params = util.getCommandLineParams();
await new DiscordGateway().deploy(params);
