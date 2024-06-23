import DiscordGateway from './discord/discord-gateway.js';
import DiscordBot from './discord/discord-bot.js';
import Util from './discord/util.js';

const params = new Util().getCommandLineParams();
await new DiscordGateway().deployTo(params);
await new DiscordBot().start();
