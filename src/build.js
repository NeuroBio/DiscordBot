import DiscordGateway from './discord/discord-gateway.js';
import DiscordBot from './discord/discord-bot.js';
import Util from './discord/util.js';

const util = new Util();
const params = util.getCommandLineParams();
await new DiscordGateway().deploy(params);

await new DiscordBot().start();
