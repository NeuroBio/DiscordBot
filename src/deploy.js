import DiscordServer from './discord/discord-server.js';
import Util from './discord/util.js';

const util = new Util();
const params = util.getCommandLineParams();
await new DiscordServer().deploy(params);
