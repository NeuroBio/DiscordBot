import DiscordServer from './discord/discord-server.js';
import DiscordBot from './discord/discord-bot.js';
import Util from './discord/util.js';

const util = new Util();
const params = util.getCommandLineParams();
await new DiscordServer().deploy(params);

await new DiscordBot().start();
