import DiscordServer from './discord/discord-server.js';
import DiscordBot from './discord/discord-bot.js';

await new DiscordServer().deploy();
await new DiscordBot().start();
