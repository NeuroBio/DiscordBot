# DiscordBot
Testing out making my own discord bot

## Getting Started
### Installation
- install VSCode (https://code.visualstudio.com/)
- install the VSCode extension ESLint
	- Note: If you add linter errors to my coe base I will be very unhappy.
- install node.  Currently, I'm using node `v18.12.0` (https://nodejs.org/en/blog/release/v18.12.0)
- clone this repo from github
	- if not open, open the VS Code terminal (hotkey ctrl+`)
	- type: `git clone https://github.com/NeuroBio/DiscordBot.git`
- install the repo
	- type: `npm install`
		- expect two new greyed-out `.json` files to appear.

### Dev Start-up
#### Scripts
There are three key scripts you need to know about (viewable in `package.json`).
1. `npm start` - This turns the bot on.
	- It will take up one instance of your terminal until you manually stop it (type: `ctrl+c`)
2. `npm run deploy` - This updates the bot commands for the **DEV** server
	- It will run and stop on its own.
3. `npm run deploy-all` - This updates the bot commands for **ALL** servers in `config.json` 
	- It will run and stop on its own.

#### Setup
This may leave you with a question: how does the code know what my dev server is?  Open `dev-config.json`.  By default, `dev-config.json` specifies the dev-server as `dev`.  Go to `config.json` to see the default servers.  `dev` is a copy of `stray-dev` (my private server).  To swap which server you are deploying to, pick a server name from `config.json`.

Note: Is `config.json` missing the `token` and `clientId` credentials?  Ask me to send them to you.  For security reasons, that data CANNOT be commit to github.

You may have an additional server you want to experiment on.  To add a new server to `config.json` you need two things:
1. An arbitrary `name`.  This is just so you recognize the server.
2. Your server's `id`.  You need to get this from the server.
	- go to discord and open `User Settings`
	- go to `Advanced` under `APP SETTINGS`
	- enable `Developer Mode`
	- Now, when you right click on your server's icon you will have a `Copy Server Id` option.  That's the id you need.

**Self:** you have the permissions locked down.  You'll need to open them if you they actually want to do this.


