/*
	Alfred - the Discord Bot!
	Here's the code for the Alfred bot. Hope you like it
*/

const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send( "Hello World!" ));
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

const Discord = require("discord.js");
const client = new Discord.Client();
const channel = client.channels.cache.get("general");
const { MessageEmbed } = require("discord.js");
var dice1 = [1, 2, 3, 4, 5, 6];
var cf = ["Heads", "Tails"];

client.on("ready", () => { 
	console.log(`Logged in as ${client.user.tag}!`); 
});

client.on("message", (msg) => {
  switch (msg.content) {
		// Ping Pong!
    case "ping":
      msg.reply("pong!");
      break;
		// Hello
    case "!a hello":
      msg.reply("Hello!");
      break;
		// Play Minecraft gif!
    case "!a play minecraft":
      msg.channel.send("https://i.imgur.com/GVEcfOU.gif");
      msg.reply("Playing Minecraft all day...");
      break;
		// Credits
    case "!a credits":
      msg.reply("This bot was made by @ManuTheCoder#5821 ");
      break;
		// Coin Flip
    case "!a flip coin":
      msg.reply(
        "Flipped a coin. Result: " + cf[Math.floor(Math.random() * cf.length)]
      );
      break;
		
    case "!a roll dice":
      msg.reply(
        "Rolled a dice. Result: " +
          dice1[Math.floor(Math.random() * dice1.length)]
      );
      break;
		// Beg for money 
    case "!a beg":
      var x = cf[Math.floor(Math.random() * cf.length)];
      if (x == "Heads") {
        message.send(`
You earned ${getRandomInt(100)} coins
*Coin balance coming soon!*
`);
      }
      break;
		// Random Image
    case "!a random image":
      msg.channel.send(`
			https://picsum.photos/${getRandomInt(1000)}/${getRandomInt(1000)}?nocache=${encodeURI(new Date())}
			`);
      break;
		// Cat Image!
		case "!a cat":
      msg.channel.send(`
			https://cataas.com/cat/says/%20?nocache=${encodeURI(new Date())}
			`);
      break;
		// Gif Cat
		case "!a cat gif":
      msg.channel.send(`
			https://cataas.com/cat/gif?nocache=${encodeURI(new Date())}
			`);
      break;
		case "!a cat cute":
      msg.channel.send(`
			https://cataas.com/cat/cute?nocache=${encodeURI(new Date())}
			`);
      break;

    case "!a help":
      msg.channel.send(`
**Commands**
*Remember - All Commands begin with an \`!a\`*

:question:⠀ **!a help** - Ask me for help
:wave:⠀ **!a hello** - Say Hello to me
:ice_cube:⠀ **!a play minecraft** - Show me some minecraft
----------
:cat:⠀ **!a cat** - Show me a cat image
:cat:⠀ **!a cat cute** - Show me a cat image (CUTE)
:cat:⠀ **!a cat gif** - Show me a cat image (GIF)
----------
:frame_photo:⠀ **!a random image** - Show random image
:robot: ⠀**!a roll dice** - Roll a dice
:coin: ⠀**!a flip coin** - Flip a coin
:robot: ⠀**!a credits**  - Credits for this bot
			`);
      break;

    default:
    // if(msg.content.indexOf('!a') >= 0) {
    // 	msg.channel.send("That's not one of my commands. Type `!a` for the full list of commands")
    // }
    // break;
  }
});
client.login(process.env.DISCORD_TOKEN);
