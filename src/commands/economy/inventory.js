const { items } = require("../../utils/shop.js");
const Items = require("../../models/items.js");
const { MessageEmbed } = require("discord.js");

const BlazifyClient = require("../../base/Command");
class Inventory extends BlazifyClient {
  constructor(client) {
    super(client, {
      name: "inventory",
      description: "Shows the Inventery of a user",
      usage: "b3inventory",
      category: "Economy",
      cooldown: 1000,
      aliases: ["inv"],
      permLevel: 1,
      permission: "READ-MESSAGES"
    });
  }
async run(client, message, args) {

        let content = "";

        await Items.findOne({ userID: message.author.id }).then(async (user) => {

            items.forEach(x => {

                let item = user[x.itemName];

                if (!item) {
                    item = 0;
                };

                let name;

                item === 1 ? name = x.itemName.charAt(0).toUpperCase() + x.itemName.slice(1) : name = x.itemName.charAt(0).toUpperCase() + x.itemName.slice(1) + "s";

                content += `${name} - ${item}\n`;
            });

            let embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Inventory`)
            .setDescription(content)
            .setColor("RANDOM");

            message.channel.send(embed);
        })

    }
  };
module.exports = Inventory;  