/*
	Alfred - the Discord Bot!
	Website: https://alfred.manuthecoder.ml
	GitHub: ManuTheCoder/Alfred
*/
var http = require("http");
var url = require("url");

var fs = require("fs");

var contents = fs.readFileSync("index.html").toString();
// const animals = require("random-animals-pictures");

const express = require("express");
const app = express();
const { MessageAttachment } = require("discord.js");
const port = 3000;
const fetch = require("node-fetch");
app.get("/", (req, res) => res.send(contents));

app.listen(port, () => {
  console.log(`Alfred listening at http://localhost:${port}`);
});

const Discord = require("discord.js");
const client = new Discord.Client();

var dice1 = [1, 2, 3, 4, 5, 6];
var cf = ["Heads", "Tails"];

function getArrayRandomElement(arr) {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
client.login(process.env.DISCORD_TOKEN);

// Cooldowns
const talkedRecently = new Set();
const pet_actions = new Set();
const passive_mode_cooldown = new Set();

// Server Add
client.on("guildMemberAdd", (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.on("message", (msg) => {
  // console.log(msg)
  console.log(msg.content.toLowerCase());
  switch (msg.content.toLowerCase()) {
    // Hello
    case "-a toggle passive mode":
      if (passive_mode_cooldown.has(msg.author.id)) {
        var embed = new Discord.MessageEmbed()
          .setTitle("Slow it down!")
          .setColor([222, 38, 53])
          .setDescription("You cannot enable passive mode again in 1 hour");
        msg.channel.send(embed);
        // msg.channel.send("Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from working, and you need to wait 1 min " + "<@!" + msg.author + ">");
      } else {
        var db = JSON.parse(
          fs.readFileSync("./database/passive.json", "utf-8")
        );
        if (db[msg.author.id] !== "undefined") {
          if (db[msg.author.id] == false) {
            db[msg.author.id] = true;
            msg.reply("Passive mode enabled");
          } else {
            db[msg.author.id] = false;
            msg.reply("Passive mode disabled");
          }
        } else {
          db[msg.author.id] = false;
        }
        fs.writeFileSync(
          "./database/passive.json",
          JSON.stringify(db, null, "\t"),
          "utf-8"
        );
        passive_mode_cooldown.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          passive_mode_cooldown.delete(msg.author.id);
        }, 3600000);
      }
      break;
    case "-a hello":
      msg.reply("Hello!");
      break;
    // Credits
    case "-a credits":
      var embed = new Discord.MessageEmbed()
        .setTitle("Credits")
        .setColor([235, 229, 73])
        .setDescription(
          "Thanks to these people and services for keeping this bot up & running!"
        )
        .addField(
          "People",
          `
@ManuTheCoder#5821
@R22 Gamer#8398`
        )
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
        .setTitle(
          "<:Alferdocoins:856991023754772521> Coin Flip <:Alferdocoins:856991023754772521>"
        )
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
      if (talkedRecently.has(msg.author.id)) {
        var embed = new Discord.MessageEmbed()
          .setTitle("Slow it down!")
          .setColor([222, 38, 53])
          .setDescription(
            "Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from begging, and you need to wait 2 seconds before working again,  " +
              "<@!" +
              msg.author +
              ">"
          );
        msg.channel.send(embed);
        // msg.channel.send("Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from working, and you need to wait 1 min " + "<@!" + msg.author + ">");
      } else {
        var x = cf[Math.floor(Math.random() * cf.length)];
        if (x == "Tails") {
          var data = JSON.parse(
            fs.readFileSync("./database/money.json", "utf-8")
          );
          var coinsEarned = getRandomInt(1, 10);
          if (
            data[msg.author.id] == "null" ||
            data[msg.author.id] == "undefined" ||
            data[msg.author.id] == null
          ) {
            data[msg.author.id] = 1;
          } else {
            data[msg.author.id] = data[msg.author.id] + coinsEarned;
          }
          var embed = new Discord.MessageEmbed()
            .setTitle("Beg")
            .setColor([235, 229, 73])
            .addField("Coins Earned: ", coinsEarned + " coins")
            .addField("Coin Balance: ", data[msg.author.id] + " coins");
          msg.channel.send(embed);

          fs.writeFileSync(
            "./database/money.json",
            JSON.stringify(data, null, "\t"),
            "utf-8"
          );

          msg.react("🪙");
        } else {
          msg.channel.send(`No coins earned`);
        }
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 2000);
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
    case "-a koala":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        fetch("https://some-random-api.ml/img/koala", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            sent.edit(
              new Discord.MessageEmbed()
                .setColor([
                  getRandomInt(0, 255),
                  getRandomInt(0, 255),
                  getRandomInt(0, 255),
                ])
                .setURL(json.link)
                .setImage(json.link)
                .setTitle("View Picture")
            );
          });
      });
      break;
    case "-a panda":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        var fact;
        fetch("https://some-random-api.ml/facts/panda", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            fact = json.fact;
            fetch("https://some-random-api.ml/img/panda", { method: "Get" })
              .then((res) => res.json())
              .then((json) => {
                sent.edit(
                  new Discord.MessageEmbed()
                    .setColor([
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                    ])
                    .setURL(json.link)
                    .setImage(json.link)
                    .setTitle("View Picture")
                );
              });
          });
      });
      break;
    case "-a fox":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        var fact;
        fetch("https://some-random-api.ml/facts/fox", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            fact = json.fact;
            fetch("https://some-random-api.ml/img/fox", { method: "Get" })
              .then((res) => res.json())
              .then((json) => {
                sent.edit(
                  new Discord.MessageEmbed()
                    .setColor([
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                    ])
                    .setURL(json.link)
                    .setDescription("**Fun fact:** " + fact)
                    .setImage(json.link)
                    .setTitle("View Picture")
                );
              });
          });
      });
      break;
    case "-a bird":
    case "-a birb":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        var fact;
        fetch("https://some-random-api.ml/facts/birb", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            fact = json.fact;
            fetch("https://some-random-api.ml/img/birb", { method: "Get" })
              .then((res) => res.json())
              .then((json) => {
                sent.edit(
                  new Discord.MessageEmbed()
                    .setColor([
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                    ])
                    .setURL(json.link)
                    .setDescription("**Fun fact:** " + fact)
                    .setImage(json.link)
                    .setTitle("View Picture")
                );
              });
          });
      });
      break;
    // Cat Image!
    case "-a cat":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        var fact;
        fetch("https://some-random-api.ml/facts/cat", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            fact = json.fact;
            fetch("https://some-random-api.ml/img/cat", { method: "Get" })
              .then((res) => res.json())
              .then((json) => {
                sent.edit(
                  new Discord.MessageEmbed()
                    .setColor([
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                    ])
                    .setURL(json.link)
                    .setDescription("**Fun fact:** " + fact)
                    .setImage(json.link)
                    .setTitle("View Picture")
                );
              });
          });
      });
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

    case "-a shop":
      var embed = new Discord.MessageEmbed()
        .setTitle("Shop")
        .setColor([235, 229, 73]).setDescription(`
\$300 \`-a buy padlock\` - Prevent people from stealing your money!
					`);
      msg.channel.send(embed);
      break;

    case "-a pet list":
      var embed = new Discord.MessageEmbed()
        .setTitle("Pets")
        .setThumbnail(
          "http://dogprintsgrooming.com/wp-content/uploads/2015/03/Dog_Print_Icons_3.png"
        )
        .setFooter(
          "Tip: Enter -a buy [PET NAME] to buy a pet\n Example: -a buy dog"
        )
        .setColor([
          getRandomInt(0, 255),
          getRandomInt(0, 255),
          getRandomInt(0, 255),
        ])
        .addField(
          "Pets",
          `
**Dog** -   300 <:Alferdocoins:856991023754772521>
**Cat** -   300 <:Alferdocoins:856991023754772521>
**Parrot** -   350 <:Alferdocoins:856991023754772521>
**Rock** -  300 <:Alferdocoins:856991023754772521>
**Frog** -  400 <:Alferdocoins:856991023754772521>
**Lizard** -  400 <:Alferdocoins:856991023754772521>
**Owl** -  500 <:Alferdocoins:856991023754772521>
**Snake** -   550 <:Alferdocoins:856991023754772521>
**Tropical Parakeet** -   600 <:Alferdocoins:856991023754772521>
**Cougar** -  600 <:Alferdocoins:856991023754772521>
**Tiger** -  800 <:Alferdocoins:856991023754772521>
`
        )
        .addField(
          "Legendary Pets",
          `
Dragon -   5000 <:Alferdocoins:856991023754772521>
Arctic Wolf -  4500 <:Alferdocoins:856991023754772521>
Eagle -  2000 <:Alferdocoins:856991023754772521>`
        );
      msg.channel.send(embed);
      break;
    // Commands list
    case "-a help":
    case "-a commands":
    case "<@!844303394335096862>":
    case "-a cmds":
      function createNewEmbed() {
        const embed = new Discord.MessageEmbed()
          .setTitle("Commands")
          .setColor([
            getRandomInt(0, 255),
            getRandomInt(0, 255),
            getRandomInt(0, 255),
          ])
          .setFooter("More features Coming Soon!")
          .setThumbnail(
            "https://icons-for-free.com/iconfiles/png/512/circle+command+key+keyboard+modifier+icon-1320196704338840666.png"
          )
          .addField(
            "Remember",
            `
*All Commands begin with an \`-a\`*`
          )
          .addField(
            "Random Animal Pics",
            `
:cat: \`-a cat\` - Show me a cat
:dog: \`-a dog\` - Show me a dog
:parrot: \`-a bird\` - Show me a bird
:fox: \`-a fox\` - Show me a fox
:panda_face: \`-a panda\` - Show me a panda
:koala: \`-a koala\` - Show me a koala
`
          )
          .addField(
            "Random",
            `
:person_pouting: \`-a profile\` - View profile
:robot: \`-a roll dice\` - Roll a dice
:robot: \`-a rpc [rock, paper, scissors]\` - Rock Paper Scissors (Choose one)
<:Alferdocoins:856991023754772521> \`-a flip coin OR -a coinflip\`- Flip a coin
`
          )
          .addField(
            "Other Commands",
            `
:laughing: \`-a meme\` - Show me a meme!
:frame_photo: \`-a random image\` - Show random image
:robot: \`-a credits\`  - Credits for this bot
:slight_smile: \`-a r :slight_smile: \` - (For example), react to the last message in current channel
`
          )
          .addField(
            "Money",
            `
:moneybag: \`-a steal @user\` - Steal from a user
:briefcase: \`-a work\` - Work
:money_mouth: \`-a leaderboard\` - View top 10 richest people in server
:money_with_wings: \`-a beg\` - Beg for coins
:bank: \`-a balance\` - View Balance
:innocent: \`-a toggle passive mode\` Turn on passive mode
`
          )
          .addField(
            "Shop & Pets",
            `
Use \`-a shop\` for list of items
Use \`-a pet list\` for list of pets
Use \`-a buy [PET NAME]\` to buy a pet
Use \`-a my pets\` to view pets owned
`
          );
        msg.channel.send(embed);
      }
      createNewEmbed();
      break;
    case "-a dog":
      var embed = new Discord.MessageEmbed()
        .setTitle("Please wait")
        .setColor([222, 38, 53])
        .setDescription("Fetching image");
      msg.channel.send(embed).then((sent) => {
        let id = sent.id;
        var fact;
        fetch("https://some-random-api.ml/facts/dog", { method: "Get" })
          .then((res) => res.json())
          .then((json) => {
            fact = json.fact;
            fetch("https://some-random-api.ml/img/dog", { method: "Get" })
              .then((res) => res.json())
              .then((json) => {
                sent.edit(
                  new Discord.MessageEmbed()
                    .setColor([
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                      getRandomInt(0, 255),
                    ])
                    .setURL(json.link)
                    .setDescription("**Fun fact:** " + fact)
                    .setImage(json.link)
                    .setTitle("View Picture")
                );
              });
          });
      });
      break;
    case "-a meme":
      let url = "https://meme-api.herokuapp.com/gimme";

      let settings = { method: "Get" };

      fetch(url, settings)
        .then((res) => res.json())
        .then((json) => {
          var embed = new Discord.MessageEmbed()
            .setTitle(json.title)
            .setColor([
              getRandomInt(0, 255),
              getRandomInt(0, 255),
              getRandomInt(0, 255),
            ])
            .setURL(json.postLink)
            .setImage(json.url)
            .setFooter("👍 " + json.ups + " | " + json.author);
          msg.channel.send(embed);
        });
      break;
    case "-a work":
      if (talkedRecently.has(msg.author.id)) {
        var embed = new Discord.MessageEmbed()
          .setTitle("Slow it down!")
          .setColor([222, 38, 53])
          .setDescription(
            "Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from working, and you need to wait 2 seconds before working again,  " +
              "<@!" +
              msg.author +
              ">"
          );
        msg.channel.send(embed);
        // msg.channel.send("Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from working, and you need to wait 1 min " + "<@!" + msg.author + ">");
      } else {
        var data = JSON.parse(
          fs.readFileSync("./database/money.json", "utf-8")
        );
        var ce = getRandomInt(5, 20);
        if (
          data[msg.author.id] == "null" ||
          data[msg.author.id] == "undefined" ||
          data[msg.author.id] == null
        ) {
          data[msg.author.id] = 0;
        } else {
          data[msg.author.id] = data[msg.author.id] + ce;
        }
        var embed = new Discord.MessageEmbed()
          .setTitle("Work")
          .setColor([
            getRandomInt(0, 255),
            getRandomInt(0, 255),
            getRandomInt(0, 255),
          ])
          .addField("Coins Earned", ce + " <:Alferdocoins:856991023754772521>")
          .addField("Coin Balance: ", data[msg.author.id] + " coins");
        msg.channel.send(embed);

        fs.writeFileSync(
          "./database/money.json",
          JSON.stringify(data, null, "\t"),
          "utf-8"
        );

        msg.react("💼");
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 2000);
      }
      break;
    case "-a my pets":
      var pet_db = JSON.parse(fs.readFileSync("./database/pets.json", "utf-8"));
      if (pet_db[msg.author.id]) {
        pet_db = pet_db[msg.author.id];
        var pets = "";
        for (const [key, value] of Object.entries(pet_db)) {
          pets += `**${ucfirst(key)}**
Quantity: ${value.qty}
Happiness: ${value.happiness || 0}

`;
        }
        var embed = new Discord.MessageEmbed()
          .setTitle("Pets")
          .setColor([235, 229, 73])
          .setDescription(pets);
        msg.channel.send(embed);
      } else {
        var embed = new Discord.MessageEmbed()
          .setTitle("Pets")
          .setColor([235, 229, 73])
          .setDescription(
            "No pets owned. Use `-a pet list` to see the list of pets and `-a buy [pet]` to buy a pet."
          );
        msg.channel.send(embed);
      }
      break;
    case "-a leaderboard":
    case "-a top":
    case "-a richest":
      var people = [];
      var db = JSON.parse(fs.readFileSync("./database/money.json", "utf-8"));
      const Guild = client.guilds.cache.get(msg.guild.id); // Getting the guild.
      const Members = Guild.members.cache.map((member) => member.id); // Getting the members and mapping them by ID.
      var members;
      Members.forEach((e) => {
        for (const [key, value] of Object.entries(db)) {
          if (e == key) {
            people.push({
              KEY: key,
              VALUE: value,
            });
          }
        }
      });
      people = people.sort(compare).reverse();
      var people1 = people;
      people = "";
      people1.slice(0, 10).forEach((e) => {
        var username = client.users.cache.get(e.KEY).username;
        people += ` **${username.trim()}** - ${
          e.VALUE
        }  <:Alferdocoins:856991023754772521>
				`;
      });
      var embed = new Discord.MessageEmbed()
        .setTitle("Top 10 richest people in this server")
        .setColor([235, 229, 73])
        .setDescription(people);
      msg.channel.send(embed);
      break;
    case "-a balance":
    case "-a bal":
      var data = JSON.parse(fs.readFileSync("./database/money.json", "utf-8"));
      if (
        data[msg.author.id] == "null" ||
        data[msg.author.id] == "undefined" ||
        data[msg.author.id] == null
      ) {
        data[msg.author.id] = 0;
      } else {
        data[msg.author.id];
      }
      var embed = new Discord.MessageEmbed()
        .setTitle("Balance")
        .setColor([235, 229, 73])
        .addField("Coin Balance: ", data[msg.author.id] + " coins");
      msg.channel.send(embed);

      fs.writeFileSync(
        "./database/money.json",
        JSON.stringify(data, null, "\t"),
        "utf-8"
      );

      break;
    case "-a pet actions":
      var embed = new Discord.MessageEmbed()
        .setColor([
          getRandomInt(0, 255),
          getRandomInt(0, 255),
          getRandomInt(0, 255),
        ])
        .setTitle("Pet Actions")
        .setDescription(`**-a pet [pet_name]** - Pet a pet!
**-a pet play [pet_name]** - Play with a pet
**-a pet hug [pet_name]** - Hug a pet!
**-a pet list** - View owned pets!
`);
      msg.channel.send(embed);
      break;
    // SHOP
    case "-a buy padlock":
      var data = JSON.parse(fs.readFileSync("./database/money.json", "utf-8"));
      if (data[msg.author.id] && data[msg.author.id] - 300 >= 0) {
        data[msg.author.id] = data[msg.author.id] - 300;
        var inv = JSON.parse(
          fs.readFileSync("./database/padlocks.json", "utf-8")
        );
        if (inv[msg.author.id] == undefined) {
          inv[msg.author.id] = 1;
        } else {
          inv[msg.author.id]++;
        }
        fs.writeFileSync(
          "./database/padlocks.json",
          JSON.stringify(inv, null, "\t"),
          "utf-8"
        );
      } else {
        msg.channel.send("Not enough Money!");
      }
      fs.writeFileSync(
        "./database/money.json",
        JSON.stringify(data, null, "\t"),
        "utf-8"
      );
      msg.channel.send(`**Purchase complete**
Padlocks are applied automatically!`);
      break;

    default:
      // Rock Paper Scissors
      if (msg.content.startsWith("-a rpc")) {
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
      } else if (msg.content.startsWith("-a buy")) {
        if (msg.content !== "-a buy") {
          var pet = msg.content.replace("-a buy ", "");
          var price = false;
          var db = JSON.parse(
            fs.readFileSync("./database/money.json", "utf-8")
          );
          switch (pet) {
            case "dog":
              price = 300;
              break;
            case "lizard":
              price = 500;
              break;
            case "cat":
              price = 300;
              break;
            case "parrot":
              price = 350;
              break;
            case "rock":
              price = 300;
              break;
            case "frog":
              price = 400;
              break;
            case "owl":
              price = 500;
              break;
            case "snake":
              price = 550;
              break;
            case "tropical parakeet":
              price = 600;
              break;
            case "cougar":
              price = 600;
              break;
            case "tiger":
              price = 800;
              break;
            case "dragon":
              price = 5000;
              break;
            case "arctic wolf":
              price = 4500;
              break;
            case "eagle":
              price = 2000;
              break;
            default:
              msg.reply("Invalid pet name!");
              return false;
              break;
          }
          if (db[msg.author.id] >= price) {
            db[msg.author.id] = db[msg.author.id] - price;
            var pet_db = JSON.parse(
              fs.readFileSync("./database/pets.json", "utf-8")
            );

            if (pet_db[msg.author.id]) {
              var user = pet_db[msg.author.id];
              if (user[pet]) {
                user[pet].qty++;
              } else {
                user[pet] = { qty: 1 };
              }
            } else {
              pet_db[msg.author.id] = {};
              var user = pet_db[msg.author.id];
              if (user[pet]) {
                user[pet]++;
              } else {
                user[pet] = { qty: 1 };
              }
            }
            fs.writeFileSync(
              "./database/pets.json",
              JSON.stringify(pet_db, null, "\t"),
              "utf-8"
            );
            fs.writeFileSync(
              "./database/money.json",
              JSON.stringify(db, null, "\t"),
              "utf-8"
            );
            msg.reply("Bought pet successfully!");
          } else {
            msg.reply("You don't have enough money!");
          }
        } else {
          msg.reply("Invalid pet name");
        }
      } else if (msg.content.startsWith("-a steal")) {
        var user = msg.content.replace("-a steal ", "");
        user = user.replace("<@!", "").replace(">", "");
        var tag = client.users.cache.get(user);
        if (tag.bot == false) {
          var data = JSON.parse(
            fs.readFileSync("./database/money.json", "utf-8")
          );
          var noSteal = JSON.parse(
            fs.readFileSync("./database/padlocks.json", "utf-8")
          );
          var passive = JSON.parse(
            fs.readFileSync("./database/passive.json", "utf-8")
          );

          if (passive[msg.author.id] == true) {
            var embed = new Discord.MessageEmbed()
              .setColor([235, 64, 52])
              .setTitle("Steal")
              .setDescription("You're currently on passive mode!");
            msg.channel.send(embed);
            return false;
          }

          if (passive[user] == true) {
            var embed = new Discord.MessageEmbed()
              .setColor([235, 64, 52])
              .setTitle("Steal")
              .setDescription(
                "Hey, leave that passive peace-loving hippy alone!"
              );
            msg.channel.send(embed);
            return false;
          }
          if (!noSteal[user] > 0) {
            if (noSteal[user] - 1 >= 0) {
              noSteal[user]--;
            } else {
              noSteal[user] = 0;
            }
            fs.writeFileSync(
              "./database/padlocks.json",
              JSON.stringify(noSteal, null, "\t"),
              "utf-8"
            );
            var moneyToSteal = getRandomInt(0, 100);
            if (
              data[user] !== 0 &&
              data[user] !== "undefined" &&
              data[user] !== "null" &&
              data[user] - moneyToSteal >= 0
            ) {
              data[user] = data[user] - moneyToSteal;
              data[msg.author.id] = data[msg.author.id] + moneyToSteal;

              fs.writeFileSync(
                "./database/money.json",
                JSON.stringify(data, null, "\t"),
                "utf-8"
              );
              var embed = new Discord.MessageEmbed()
                .setColor([235, 64, 52])
                .setTitle("Steal")
                .setDescription(
                  "You stole: " +
                    moneyToSteal +
                    " <:Alferdocoins:856991023754772521>"
                );
              msg.channel.send(embed);
            } else {
              var embed = new Discord.MessageEmbed()
                .setColor([235, 64, 52])
                .setTitle("Steal")
                .setDescription("User doesn't have enough money to steal!");
              msg.channel.send(embed);
            }
          } else {
            if (noSteal[user] - 1 >= 0) {
              noSteal[user]--;
            }
            var e = JSON.parse(
              fs.readFileSync("./database/money.json", "utf-8")
            );
            if (e[msg.author.id]) {
              e[msg.author.id] = e[msg.author.id] - 500;
            }
            fs.writeFileSync(
              "./database/money.json",
              JSON.stringify(e, null, "\t"),
              "utf-8"
            );
            fs.writeFileSync(
              "./database/padlocks.json",
              JSON.stringify(noSteal, null, "\t"),
              "utf-8"
            );
            msg.channel.send(
              "User has padlock attached to wallet! You got caught lost <:Alferdocoins:856991023754772521> 500"
            );
          }
        } else {
          msg.channel.send(
            "Hey, go pick on someone your own size! You can't steal from bots...."
          );
        }
      } else if (
        msg.content.startsWith("-a profile") ||
        msg.content.startsWith("-a me")
      ) {
        var people = [];
        var db = JSON.parse(fs.readFileSync("./database/money.json", "utf-8"));
        const Guild = client.guilds.cache.get(msg.guild.id); // Getting the guild.
        const Members = Guild.members.cache.map((member) => member.id); // Getting the members and mapping them by ID.
        var members;
        Members.forEach((e) => {
          for (const [key, value] of Object.entries(db)) {
            if (e == key) {
              people.push({
                KEY: key,
                VALUE: value,
              });
            }
          }
        });
        people = people.sort(compare).reverse();

        if (msg.content == "-a profile" || msg.content == "-a me") {
          var user = {
            id: msg.author.id,
            name: msg.author.tag,
            pic: msg.author.avatar,
            bot: msg.author.bot,
            full: msg.author,
          };
        } else {
          var tag = client.users.cache.get(msg.content.replace(/\D/g, ""));
          var user = {
            id: msg.content.replace(/\D/g, ""),
            name: tag.tag,
            pic: tag.avatar,
            full: tag,
            bot: tag.bot,
          };
        }
        if (user.bot == false) {
          var pet_db = JSON.parse(
            fs.readFileSync("./database/pets.json", "utf-8")
          );
          if (pet_db[msg.author.id]) {
            pet_db = pet_db[user.id];
            var pets = "";
            if (pet_db !== "undefined" && pet_db !== undefined) {
              for (const [key, value] of Object.entries(pet_db)) {
                pets += `**${value.qty}** ${key}s
`;
              }
            } else {
              pets = "No pets owned";
            }
          } else {
            var pets = "No pets owned.";
          }
          var found = false;
          for (var i = 0; i < people.length; i++) {
            if (people[i].KEY == user.id) {
              found = true;
              break;
            }
          }
          var xpDB = JSON.parse(fs.readFileSync("./database/xp.json", "utf-8"));
          var data = JSON.parse(
            fs.readFileSync("./database/money.json", "utf-8")
          );
          var embed = new Discord.MessageEmbed()
            .setTitle(user.name)
            .setColor([
              getRandomInt(0, 255),
              getRandomInt(0, 255),
              getRandomInt(0, 255),
            ])
            .setDescription(
              "" +
                (found == true
                  ? " :moneybag: Top 10 richest people in server!"
                  : "")
            )
            .setThumbnail(
              "https://cdn.discordapp.com/avatars/" +
                user.id +
                "/" +
                user.pic +
                ".png?size=256"
            )
            .addField(
              "Balance",
              (data[user.id] ? data[user.id] : "0") +
                " <:Alferdocoins:856991023754772521>"
            )
            .addField("Pets", pets)
            .addField("XP", xpDB[user.id] + " :green_circle:" || "No XP!");
          msg.channel.send(embed);
        } else {
          msg.reply("User is bot!");
        }
      } else if (msg.content.startsWith("-a creatememe")) {
        if (msg.content == "-a creatememe") {
          msg.channel.send(`Create a meme by typing: 
\`-a creatememe TOP_TEXT | BOTTOM_TEXT | TEMPLATE_NAME\`					
	`);
          const attachment = new MessageAttachment("templates.txt");
          // Send the attachment in the message channel
          msg.channel.send(attachment);
          return false;
        }
        var topText =
          msg.content.replace("-a creatememe", "").split("|")[0] || "Undefined";
        var bottomText =
          msg.content.replace("-a creatememe", "").split("|")[1] || "Undefined";
        var template =
          msg.content
            .replace("-a creatememe", "")
            .split("|")[2]
            .trim()
            .replace(" ", "-") || "10-guy";
        console.log(template);
        if (topText && bottomText && template) {
          var image = `https://apimeme.com/meme?meme=${encodeURIComponent(
            template
          )}&top=${encodeURIComponent(topText)}&bottom=${encodeURIComponent(
            bottomText
          )}`;
          console.log(image);

          var embed = new Discord.MessageEmbed()
            .setColor([235, 64, 52])
            .setImage(image);
          msg.channel.send(embed);
        } else {
          msg.reply("Invalid meme request!");
        }
      } else if (msg.content.startsWith("-a slots")) {
        if (msg.content == "-a slots") {
          var embed = new Discord.MessageEmbed()
            .setTitle(
              "Slots"
            )
            .setColor([235, 229, 73])
            .setDescription(
              "Incorrect value for slots. Please specify money to earn/lose. Example: -a slots 10"
            );
          msg.channel.send(embed);
        } else {
          var slots = parseInt(msg.content.replace("-a slots ", ""));
          var s = getArrayRandomElement(cf);
          var db = JSON.parse(
            fs.readFileSync("./database/money.json", "utf-8")
          );
          if (
            db[msg.author.id] &&
            parseInt(db[msg.author.id]) - parseInt(slots) >= 0
          ) {
            if (s == "Heads") {
              db[msg.author.id] = db[msg.author.id] + slots;
							var embed = new Discord.MessageEmbed()
								.setTitle("Slots")
								.setColor([235, 229, 73])
								.setDescription("You won <:Alferdocoins:856991023754772521>⠀" + slots + "!");
								msg.channel.send(embed);
              fs.writeFileSync(
                "./database/money.json",
                JSON.stringify(db, null, "\t"),
                "utf-8"
              );
            } else {
              db[msg.author.id] = db[msg.author.id] - slots;
              var embed = new Discord.MessageEmbed()
								.setTitle("Slots")
								.setColor([235, 229, 73])
								.setDescription("You lost <:Alferdocoins:856991023754772521>⠀" + slots + "!");
								msg.channel.send(embed);
              fs.writeFileSync(
                "./database/money.json",
                JSON.stringify(db, null, "\t"),
                "utf-8"
              );
            }
          } else {
            msg.reply("Not enough coins!");
          }
        }
      } else if (msg.content.startsWith("-a r")) {
        var emoji = msg.content.replace("-a r ", "");
        msg.channel.lastMessage.react(emoji);
        msg.channel.messages.fetch({ limit: 2 }).then((res) => {
          let lm = res.last();
          lm.react(emoji);
        });
        msg.delete();
      } else if (msg.content.startsWith("-a pet")) {
        var pet_db = JSON.parse(
          fs.readFileSync("./database/pets.json", "utf-8")
        );

        var pet = msg.content
          .replace("-a pet ", "")
          .replace("hug ", "")
          .replace("play ", "")
          .toLowerCase();

        if (pet_db[msg.author.id]) {
          var author_pet_db = pet_db[msg.author.id];

          if (author_pet_db[pet]) {
            if (msg.content.startsWith("-a pet hug")) {
              msg.reply("You hugged your " + pet + ", Awwwww!");
            } else if (msg.content.startsWith("-a pet play")) {
              if (pet_actions.has(msg.author.id)) {
                var embed = new Discord.MessageEmbed()
                  .setTitle("Slow it down!")
                  .setColor([222, 38, 53])
                  .setDescription(
                    "You're tired after playing with your " + pet + "!"
                  );
                msg.channel.send(embed);
                // msg.channel.send("Whoah whoah woah. Easy there buddy! There's no point in spamming this command. You are tired from working, and you need to wait 1 min " + "<@!" + msg.author + ">");
              } else {
                var money_db = JSON.parse(
                  fs.readFileSync("./database/money.json", "utf-8")
                );
                var xpDB = JSON.parse(
                  fs.readFileSync("./database/xp.json", "utf-8")
                );
                if (xpDB[msg.author.id]) {
                  xpDB[msg.author.id] = xpDB[msg.author.id] + 10;
                } else {
                  xpDB[msg.author.id] = 1;
                }
                fs.writeFileSync(
                  "./database/xp.json",
                  JSON.stringify(xpDB, null, "\t"),
                  "utf-8"
                );
                var cc = getRandomInt(1, 5);
                if (money_db[msg.author.id]) {
                  money_db[msg.author.id] += cc;
                } else {
                  money_db[msg.author.id] = cc;
                }
                if (author_pet_db[pet].happiness) {
                  author_pet_db[pet].happiness++;
                } else {
                  author_pet_db[pet].happiness = 1;
                }
                pet_db[msg.author.id] = author_pet_db;
                var embed = new Discord.MessageEmbed()
                  .setColor([
                    getRandomInt(0, 255),
                    getRandomInt(0, 255),
                    getRandomInt(0, 255),
                  ])
                  .setTitle(ucfirst(pet))
                  .setDescription(`You played with your your ${pet}!`)
                  .addField(
                    `Result`,
                    `+ ${cc} <:Alferdocoins:856991023754772521>
+  10 :green_circle:
+ 1% Happiness`
                  );
                msg.channel.send(embed);
                fs.writeFileSync(
                  "./database/money.json",
                  JSON.stringify(money_db, null, "\t"),
                  "utf-8"
                );
                fs.writeFileSync(
                  "./database/pets.json",
                  JSON.stringify(pet_db, null, "\t"),
                  "utf-8"
                );
                pet_actions.add(msg.author.id);
                setTimeout(() => {
                  // Removes the user from the set after a minute
                  pet_actions.delete(msg.author.id);
                }, 5000);
              }
            } else {
              msg.reply("You petted your " + pet + "!");
            }
          } else {
            msg.reply("You don't own this pet!");
          }
        } else {
          msg.reply("You don't have any pets!");
          return false;
        }
      }
      break;
  }
});
client.on("ready", () => {
  // client.user.setAvatar('https://media.istockphoto.com/vectors/chat-bot-ai-and-customer-service-support-concept-vector-flat-person-vector-id1221348467?b=1&k=6&m=1221348467&s=612x612&w=0&h=eDVkBNvNtCLsXL40pRs4iwMsO0qZgik81JX1FeO713M=')
  console.log(`Logged in as ${client.user.tag}!`);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function compare(a, b) {
  if (a.VALUE < b.VALUE) {
    return -1;
  }
  if (a.VALUE > b.VALUE) {
    return 1;
  }
  return 0;
}
function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}