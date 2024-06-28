# DiscordBot
What is says on the tin: a bot for convenience and trolling in my private discord servers.
![discordbot](https://github.com/NeuroBio/DiscordBot/assets/8708809/e389d2a4-e822-42fd-bf37-3d36edbd6c40)
---

## Getting Started
The intended audience here is my friends who are novice coders.  There will be information included that an experienced developer takes for granted.


### Installation
- install VSCode (https://code.visualstudio.com/)
- install the VSCode extension ESLint
	- Note: If you add linter errors to my code base I will be very unhappy.
- install node.  Currently, I'm using node `v18.12.0` (https://nodejs.org/en/blog/release/v18.12.0)
- clone this repo from github
	- if not open, open the VS Code terminal (hotkey `ctrl+`)
	- type: `git clone https://github.com/NeuroBio/DiscordBot.git`
- install the repo
	- type: `npm install`
		- expect two new greyed-out `.json` files to appear in the root directory.
		- if they don't appear, ping me; a post-install script failed to run

#### Nice-to-Have VSCode Extensions
- ESLint
- GitLens

### Dev Start-up
#### Scripts
There are three key scripts you need to know about (viewable in `package.json`).
1. `npm start` - This turns the bot on.
	- It will take up one instance of your terminal until you manually stop it (type: `ctrl+c`).
2. `npm run build` - This deploys code to your dev server and starts the bot
	- note: if you just want to deploy, see **Other Scripts**
	- It will take up one instance of your terminal until you manually stop it (type: `ctrl+c`).
3. `npm run test` -  runs unit tests.
	- It will run and stop on its own.
	- It would be great if you wrote some.  See the dev process section below for why it's helpful.
	- Worst case, always run them before deploying.  If any tests fail, then you broke something.
	- If you're a real go-getter, there is also a small number of integration tests run with `npm run test-int`.
		- ideally, don't write integration tests.  You only need them if you are testing something that requires real data.  I have 2 atm for...
			- confirming that a web scrape pattern still works against the sererbii's data
			- confirming that all commands have unique names (because I keep failing deploys on this)

	

#### Setup
You may be wondering: how does the code know what my dev server is?  What is `dev-config.json`?  Open that file.  By default, `dev-config.json` specifies the dev-server as `dev`.  Go to `config.json` to see the default servers.  `dev` is a clone of `stray-dev` (my private server).  You can add servers to this list, but please do not modify the ones that are in place.  To change the server you are deploying to for development, pick a server key from `config.json` and change `dev-config.json` to use that key as the value for `devServer`.

Note: Is `config.json` missing values for `token` and `clientId` credentials?  Ask me to send them to you.  For security reasons, that data CANNOT be committed to github.

You may have an additional server you want to experiment on.  To add a new server to `config.json` you need two things:
1. An arbitrary `name`.  This is just so you recognize the server.
2. Your server's `id`.  You need to get this from the server.
	- go to discord and open `User Settings`
	- go to `Advanced` under `APP SETTINGS`
	- enable `Developer Mode`
	- Now, when you right click on your server's icon you will have a `Copy Server Id` option.  That's the id you need.

**Self:** you have the bot's install permissions locked down.  You'll need to open them if folks actually want to do this.

#### Where to Develop
After setup is complete, you can basically ignore all files outside of `src/commands/library`.  Library is where the discord bot command code lives.  Start by looking at one of the existing commands (e.g. `PingCommand` in `utility/ping.js` is very simple).  Most of your code will be the 'work' performed by a command's `execute` function.  The data property uses the `discord.js` library to name your command, describe it, and add arguments to the command.  You can consider the rest of the file boiler plate until you start wanting to do more complex operations.  Good example of moderate complexity commans include:
- `PokedexCommand` in `fetchers/pokdex.js`, which loads libraries for interacting with websites (REST opperations with `axios` + webscraping with `cheerio`).
- `EightballCommand` in `dice/eightball.js`, which loads locally stored data from `dice/data/eightball.js`
Command should not live loose in the library folder.  Feel free to make new folders within library.  You cannot nest command folders however.  The code looking for commands only looks for top level folders in library.  That prevents it from trying to load the nested data folders as commands.

Beyond that, I think the discord.js interface is fairly self-explanatory.  Their tutorials and documentation is here: https://discord.js.org/.

Note: If you start working through the discord.js guide from the beginning, the go through steps already done in the repo... though and massively refactored.  For comparison, most of the contents of their `index.js` file is my `DiscordBot` class.  Most of the contents of their `deploy-commands.js` file is my `DiscordGateway` class.  My classes are instantiated do work in the tiny script files including `deploy.js`, `start.js`, ect.  As for the "most of" part, I moved the command loading code for `inex.js` and `deploy-commands.js` into the `CommandLibrary` class, since you need it for starting the bot and deploying the commands.

#### Getting Your Code into the Repo
If the words "branch", "pull request", or "unit test" mean nothing to you, ping me and I'll walk you through the processes bit-by-bit as needed.  Just start with this nugget: if you try to push code directly to the main repo, you will be denied.  It's *supposed* to be that way.  I'm going to review and approve code going into teh main repo.


---

## Planned Command work
- punishme
	- trolls the caller >:)
- prompt
	- finish filling out the word banks

---

## Quality of life features
### Supported
- generates config templates on install (when they don't exist)
- lint autofixes on save
- change dev "environment" (server) with one json change to `dev-config.json`
- jsDoc annotations on public functions
- unit testing capable and fullly tested
	- everything that matters now uses dependency injection for easier testing
- build script that does a combined command deployment + starts the bot
- web operations possible with axios + cheerio

### On Deck
- high priority
	- get a better test reporter; jasmine's base reporter is not great
		- cry if karma is required to swap reporters
	- CI for my unit and integration tests
	- lock down branch policies to block direct merges
		- also require passing tests?
- medium priority
	- figure out how to get the bot to run perpetually on raspberry pi
	- figure out how to connect with firebase to start doing real database operations
- low priority
	- add karma to make test run on save
		- manually running tests hasn't hurt me too much and karma adds a lot of overhead

---

## Other Minutia
### Deploy Scripts
For when you just need to deploy commands without starting the bot.
`npm run deploy` - This updates the bot commands for the **DEV** server in `config.json`, as defined by your `dev.config.json`,
- It will run and stop on its own.
- there are two other varients:
	- `npm run deploy-prod`
		-  runs for the **PROD** server in `config.json`
	- `npm run deploy-all`
		- This updates the bot commands for **all** servers in `config.json`

---
