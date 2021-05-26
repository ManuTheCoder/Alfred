/*
	Alfred - the Discord Bot!
	Here's the code for the Alfred bot. Hope you like it
*/
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
    console.log(`Alfred listening at http://localhost:${port}`)
);

const Discord = require("discord.js");
const client = new Discord.Client();


var dice1 = [1, 2, 3, 4, 5, 6];
var cf = ["Heads", "Tails"];


function getArrayRandomElement (arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}



client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
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
            msg.reply("This bot was made by @ManuTheCoder#5821 ");
            break;
            // Coin Flip
        case "-a flip coin":
            msg.reply(
                "Flipped a coin. Result: " + cf[Math.floor(Math.random() * cf.length)]
            );
            break;
				case "-a meme": 
						// var contents = fs.readFileSync('https://meme-api.herokuapp.com/gimme').toString();
						// msg.channel.send(contents)
					  break;
        case "-a roll dice":
            msg.reply(
                "Rolled a dice. Result: " +
                dice1[Math.floor(Math.random() * dice1.length)]
            );
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
			https://picsum.photos/${getRandomInt(100, 1000)}/${getRandomInt(100, 1000)}?nocache=${encodeURI(new Date())}
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
        case "-a cat cute":
            msg.channel.send(`
			https://cataas.com/cat/cute?nocache=${encodeURI(new Date())}
			`);
            break;
			case "-a count":
			var i = 0
            var s = setInterval(function() {
							if(i < 100) {
								i++;
								msg.channel.send(i);
							}
							else {
								clearTimeout(s)
							}
						}, 100)
					break;
        case "-a help":
            function createNewEmbed() {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Commands")
                    .setColor([62, 150, 62])
                    .setFooter("More features Coming Soon!")
                    .setThumbnail('https://icons-for-free.com/iconfiles/png/512/circle+command+key+keyboard+modifier+icon-1320196704338840666.png')
                    .addField('Remember', `
*Remember - All Commands begin with an \`-a\`*`)
                    .addField("Cats", `
:cat:⠀ **-a cat** - Show me a cat image
:cat:⠀ **-a cat cute** - Show me a cat image (CUTE)
:cat:⠀ **-a cat gif** - Show me a cat image (GIF)
`)
                    .addField("Random", `
:robot: ⠀**-a roll dice** - Roll a dice
:robot: ⠀**-a rpc [rock, paper, scissors]** - Rock Paper Scissors (Choose one)
:coin: ⠀**-a flip coin** - Flip a coin
`)
                    .addField('Other Commands', `
:question:⠀ **-a help** - Ask me for help
:wave:⠀ **-a hello** - Say Hello to me
:ice_cube:⠀ **-a play minecraft** - Show me some minecraft
:frame_photo:⠀ **-a random image** - Show random image
:slight_smile: **-a help** - Show an embed 
:robot: ⠀**-a credits**  - Credits for this bot`)
                msg.channel.send(embed)
            }
            createNewEmbed();
            // msg.channel.send(`
            // `);
            break;
        case "-a me":
            var embed = new Discord.MessageEmbed()
                .addField('Your username: ', msg.author.username)
            msg.channel.send(embed)
            break;
        default:
            if (msg.content.includes("-a rpc")) {
                var moves = ["rock", "paper", "scissors"];
                var userInput = msg.content.replace("-a rpc ", "")
                if (userInput.toLowerCase() == "rock" || userInput.toLowerCase() == "scissors" || userInput.toLowerCase() == "paper") {
										var computerInput = getArrayRandomElement(moves);
									  var stat = false;
										if(computerInput == userInput) {
											var color = [201, 185, 56];
											stat = 'Tie  :neutral_face:';
										}
										else if(userInput == "paper" && computerInput == "scissors" || userInput == "rock" && computerInput == "paper" || userInput == "scissors" && computerInput == "rock") {
											var color = [201, 81, 56];
											stat = "You Lost  :slight_frown:";
											// lose
										}
										else {
											var color = [62, 150, 62]
											stat = 'You won!	:partying_face:';
											// win
										}

										var embed = new Discord.MessageEmbed()
											.addField('Your input: ', userInput)
											.setColor(color)
											.setTitle(stat)
											.addField('Computer\'s input: ', computerInput)
										msg.channel.send(embed)
                }
            }
    }
});
client.login(process.env.DISCORD_TOKEN);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}