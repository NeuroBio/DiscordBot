# DiscordBot
Testing out making my own discord bot

## Getting Started
### Installation
- install VS-Code (https://code.visualstudio.com/)
- install node.  Currently, I'm using node `v18.12.0` (https://nodejs.org/en/blog/release/v18.12.0)
- clone this repo from github
	- if not open, open the VS Code terminal (hotkey ctrl+`)
	- type: `git clone https://github.com/NeuroBio/DiscordBot.git`
- install the repo
	- type: `npm install`

### Dev Start-up
#### Scripts
There are three key scripts you need to know about (viewable in `package.json`).
1. `npm start` - This turns the bot on.
	- It will permanently take up one instance of your terminal until you stop it (type: `ctrl+c`)
2. `npm run deploy` - This updates the bot commands for your DEV server
	- It will run and stop.
3. `npm run deploy-prod` - This updates the bot commands for ALL servers in `config.json` 
	- It will run and stop.

#### Setup
This may leave you with a question: how does the code know what my dev server is?  That is something you have to set up!  Open `dev-config.json`.  By default, the dev-config specifies the dev-server as `stray-dev` (in other words my private server).  Change `stray-dev` to the name of a server in `config.json`.  No `config.json` file?  Ask me to send it to you.

You may want to create your own server to experiment on.  To add a new server to `config.json` you need two things:
1. An arbitrary `name`.  This is just so you recognize the server and can set it as your dev server in `dev-config.json`.
2. Your server's `id`.  You need to get this from the server.
	- go to discord and open `User Settings`
	- go to `Advanced` under `APP SETTINGS`
	- enable `Developer Mode`
	- Now, when you right click on your server's icon you will have a `Copy Server Id` option.  That's the id you need.
-- self: you have the permissions locked down.  You'll need to open them if you they actually want to do this


#### Terminal management
You can free your terminal from any running process with `ctrl+c`.  You can also have more than one terminal open. Click the "split terminal" button to get more. click the trashcan to close the current terminal.
