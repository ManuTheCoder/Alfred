/*
	Alfred - the Discord Bot!
	Here's the code for the Alfred bot. Hope you like it
*/
const express = require("express");
const app = express();
const port = 3000;
const fetch = require("node-fetch");
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Alfred listening at http://localhost:${port}`)
);

const Discord = require("discord.js");
const client = new Discord.Client();

var dice1 = [1, 2, 3, 4, 5, 6];
var cf = ["Heads", "Tails"];

function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  console.log(msg.content.toLowerCase());
  switch (msg.content.toLowerCase()) {
    // Ping Pong!
    case "ping":
      msg.reply("pong!");
      break;
    // Hello
    case "-a hello":
      msg.reply("Hello!");
      break;
    // Play Minecraft gif!
    case "-a play minecraft":
      msg.channel.send("https://i.imgur.com/GVEcfOU.gif");
      msg.reply("Playing Minecraft all day...");
      break;
    // Credits
    case "-a credits":
      var embed = new Discord.MessageEmbed()
        .setTitle("Credits")
        .setColor([235, 229, 73])
        .setDescription(
          "Thanks to these people and services for keeping this bot up & running!"
        )
        .addField("People", "@ManuTheCoder#5821")
        .addField(
          "Services",
          `
	Node.JS
	ExpressJS
	CatAas (For cute cats!!!)
	Picsum.photos (For random photos)
	Repl.it
	GitHub					
	`
        );
      msg.channel.send(embed);
      break;
    // Coin Flip
    case "-a flip coin":
    case "-a coinflip":
      var embed = new Discord.MessageEmbed()
        .setTitle(":coin: Coin Flip :coin:")
        .setColor([235, 229, 73])
        .addField("Result: ", getArrayRandomElement(cf));
      msg.channel.send(embed);
      break;
    // Roll Dice
    case "-a roll dice":
    case "-a diceroll":
      var res = dice1[Math.floor(Math.random() * dice1.length)];
      switch (res) {
        case 1:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg";
          break;
        case 2:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dice-2-b.svg/1200px-Dice-2-b.svg.png";
          break;
        case 3:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dice-3-b.svg/1024px-Dice-3-b.svg.png";
          break;
        case 4:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-4-b.svg/557px-Dice-4-b.svg.png";
          break;
        case 5:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Dice-5-b.svg/1200px-Dice-5-b.svg.png";
          break;
        case 6:
          var img =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Dice-6-b.svg/768px-Dice-6-b.svg.png";
          break;
      }
      msg.react("✅");
      var embed = new Discord.MessageEmbed()
        .setColor([255, 255, 255])
        .setTitle("Dice Roll")
        .setThumbnail(img)
        .addField("Result ", res);
      msg.channel.send(embed);
      break;
    // Beg for money
    case "-a beg":
      var x = cf[Math.floor(Math.random() * cf.length)];
      if (x == "Tails") {
        msg.channel.send(`
You earned ${getRandomInt(1, 100)} coins
*Coin balance coming soon!*
`);
      } else {
        msg.channel.send(`No coins earned`);
      }
      break;
    // Random Image
    case "-a random image":
      msg.channel.send(`
			https://picsum.photos/${getRandomInt(100, 1000)}/${getRandomInt(
        100,
        1000
      )}?nocache=${encodeURI(new Date())}
			`);
      break;
    // Cat Image!
    case "-a cat":
      msg.channel.send(`
			https://cataas.com/cat/says/%20?nocache=${encodeURI(new Date())}
			`);
      break;
    // Gif Cat
    case "-a cat gif":
      msg.channel.send(`
			https://cataas.com/cat/gif?nocache=${encodeURI(new Date())}
			`);
      break;
    // Cute cat
    case "-a cat cute":
      msg.channel.send(`
			https://cataas.com/cat/cute?nocache=${encodeURI(new Date())}
			`);
      break;
    // Count to 10
    case "-a count":
      var i = 0;
      var s = setInterval(function () {
        if (i < 10) {
          i++;
          msg.channel.send(i);
        } else {
          clearTimeout(s);
        }
      }, 100);
      break;

    // Emojis!
    case "-a lenny":
      var emojis = [
        "( ͡° ͜ʖ ͡°)",
        "( ͠° ͟ʖ ͡°)",
        "( ͡~ ͜ʖ ͡°)",
        "( ͡ʘ ͜ʖ ͡ʘ)",
        "( ͡o ͜ʖ ͡o)",
        "(° ͜ʖ °)",
        "( ‾ʖ̫‾)",
        "( ಠ ͜ʖಠ)",
        "( ͡° ʖ̯ ͡°)",
        "( ͡ಥ ͜ʖ ͡ಥ)",
        "༼  ͡° ͜ʖ ͡° ༽",
        "(▀̿Ĺ̯▀̿ ̿)",
        "( ✧≖ ͜ʖ≖)",
        "(ง ͠° ͟ل͜ ͡°)ง",
        "(͡ ͡° ͜ つ ͡͡°) ",
        "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
        "(✿❦ ͜ʖ ❦)",
        "ᕦ( ͡° ͜ʖ ͡°)ᕤ",
        "¯_( ͡° ͜ʖ ͡°)_/¯",
        "(╯ ͠° ͟ʖ ͡°)╯┻━┻",
        "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
        "¯_(ツ)_/¯",
        "ಠ_ಠ",
      ];
      msg.channel.send(getArrayRandomElement(emojis));
      break;
    // Commands list
    case "-a help":
    case "-a commands":
    case "-a cmds":
      function createNewEmbed() {
        const embed = new Discord.MessageEmbed()
          .setTitle("Commands")
          .setColor([62, 150, 62])
          .setFooter("More features Coming Soon!")
          .setThumbnail(
            "https://icons-for-free.com/iconfiles/png/512/circle+command+key+keyboard+modifier+icon-1320196704338840666.png"
          )
          .addField(
            "Remember",
            `
*Remember - All Commands begin with an \`-a\`*`
          )
          .addField(
            "Cats",
            `
:cat:⠀ **-a cat** - Show me a cat image
:cat:⠀ **-a cat cute** - Show me a cat image (CUTE)
:cat:⠀ **-a cat gif** - Show me a cat image (GIF)
`
          )
          .addField(
            "Random",
            `
:robot: ⠀**-a roll dice** - Roll a dice
:robot: ⠀**-a rpc [rock, paper, scissors]** - Rock Paper Scissors (Choose one)
:coin: ⠀**-a flip coin OR -a coinflip**- Flip a coin
`
          )
          .addField(
            "Other Commands",
            `
:question:⠀ **-a help OR -a cmds OR -a commands** - Ask me for help
:laugh:⠀ **-a meme** - Show me a meme!
:wave:⠀ **-a hello** - Say Hello to me
:ice_cube:⠀ **-a play minecraft** - Show me some minecraft
:frame_photo:⠀ **-a random image** - Show random image
:slight_smile: **-a help** - Show an embed 
:robot: ⠀**-a credits**  - Credits for this bot`
          );
        msg.channel.send(embed);
      }
      createNewEmbed();
      // msg.channel.send(`
      // `);
      break;
    case "-a me":
      var embed = new Discord.MessageEmbed().addField(
        "Your username: ",
        msg.author.username
      );
      msg.channel.send(embed);
      break;

    case "-a meme":
      let url = "https://meme-api.herokuapp.com/gimme";

      let settings = { method: "Get" };

      fetch(url, settings)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          var embed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setColor([255, 255, 255])
            .setURL(json.postLink)
            .setImage(json.url)
            .setFooter("👍 " + json.ups + " | " + json.author);
          msg.channel.send(embed);
        });
      break;

    default:
      // Rock Paper Scissors
      if (msg.content.includes("-a rpc")) {
        var moves = ["rock", "paper", "scissors"];
        var userInput = msg.content.replace("-a rpc ", "");
        if (
          userInput.toLowerCase() == "rock" ||
          userInput.toLowerCase() == "scissors" ||
          userInput.toLowerCase() == "paper"
        ) {
          var computerInput = getArrayRandomElement(moves);
          var stat = false;
          if (computerInput == userInput) {
            var color = [201, 185, 56];
            stat = "Tie  :neutral_face:";
          } else if (
            (userInput == "paper" && computerInput == "scissors") ||
            (userInput == "rock" && computerInput == "paper") ||
            (userInput == "scissors" && computerInput == "rock")
          ) {
            var color = [201, 81, 56];
            stat = "You Lost  :slight_frown:";
            // lose
          } else {
            var color = [62, 150, 62];
            stat = "You won!	:partying_face:";
            // win
          }
          switch (userInput) {
            case "rock":
              var img =
                "https://images.vexels.com/media/users/3/145827/isolated/preview/357f06ecbaaa77d750259c459c0ed55f-round-rock-illustration-by-vexels.png";
              break;
            case "paper":
              var img =
                "https://img.freepik.com/free-vector/white-paper-sheet-illustration_275806-797.jpg?size=338&ext=jpg";
              break;
            case "scissors":
              var img =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Scissors_icon_black.svg/1024px-Scissors_icon_black.svg.png";
              break;
          }
          var embed = new Discord.MessageEmbed()
            .addField("Your input: ", userInput)
            .setColor(color)
            .setTitle(stat)
            .setThumbnail(img)
            .addField("Computer's input: ", computerInput);
          msg.channel.send(embed);
        }
      }
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}