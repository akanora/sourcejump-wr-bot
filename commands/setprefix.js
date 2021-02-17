const prefixes = require("../jsons/prefixes.json")
const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
	name: 'setprefix',
	aliases: ['prefix', 'osuprefix'],
	cooldown: 2.5,
	description: 'setprefix!',
	args: true,
	usage: '<prefix>',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {
		var prefix = args[0]
		prefixes[message.guild.id] = {
			prefix: prefix
		}
		fs.writeFile("./jsons/prefixes.json", JSON.stringify(prefixes, null, 4), err => {
			if (err) throw err
			message.channel.send("Your prefix linked as " + `**${prefix}**`)
		})
	}
};