const SteamID = require('steamid');
const Discord = require("discord.js");
let api = require('../sourcejumpapi.js');

module.exports = {
    name: 'wr',
    aliases: ['top', 'worldrecord'],
    cooldown: 2.5,
    description: 'wr',
    args: false,
    usage: '<map> <rank>',
    guildOnly: true,
    permissions: false,
    async execute(message, args) {
        //my stupid way to get username
        try {
            if (!args[0]) {
                return message.channel.send("Please specify a map. Usage: !wr <map> <rank>")
            } else {
                map = args[0]
            }
        } catch (err) {
            return console.log(err)
        }
        let promise = new Promise((res, rej) => {
            let promises = [];
            promises.push(api.get_wr(map))
            Promise.all(promises).then(resp => {
                resp.forEach(getwr => {
                    if (!args[1]) {
                        i = 0
                    } else {
                        i = args[1] - 1
                    }
                    sid = new SteamID(`${getwr[i]["steamid"]}`);
                    steamlink = `https://steamcommunity.com/profiles/${sid.getSteamID64()}`
                    if (getwr[i]["country"] === null) {
                        countryflagicon = "https://cdn.discordapp.com/attachments/780490774251962379/811652581646532638/level6969.png"
                    } else {
                        countryflagicon = "https://countryflagsapi.com/png/" + getwr[i]["country"];
                    }
                    username = getwr[i]["name"]
                    mapname = getwr[i]["map"]
                    tier = getwr[i]["tier"]
                    time = getwr[i]["time"]
                    sync = getwr[i]["sync"]
                    strafe = getwr[i]["strafes"]
                    jump = getwr[i]["jumps"]
                    date = getwr[i]["date"]
                    runid = getwr[i]["id"]
                    server = getwr[i]["hostname"]
                })
                res(username);
            }).catch((err) => {
                if (err.message === "Cannot read property 'steamid' of undefined") {
                    console.log(err)
                    return message.channel.send(`~~${map}~~ **was not found.**`)
                } else {
                    console.log(err)
                }
            })
        })
        try {
            let username = await promise
            api.get_avatar(sid.getSteamID64()).then(avatar => {
                embed = new Discord.MessageEmbed().setAuthor(`SourceJump #${i + 1} for ` + `${map}`, countryflagicon, steamlink).setThumbnail(avatar).addFields({
                        name: '**Username**',
                        value: `[${username}](${steamlink})`,
                        inline: true
                    }, {
                        name: '**Time**',
                        value: `${time}`,
                        inline: true
                    }, {
                        name: 'Additional',
                        value: `**Sync:** ${sync} **Strafes:** ${strafe} **Jumps:** ${jump}\n**Date:** ${date}\n**Run ID:** [${runid}](https://www.sourcejump.net/records/id/${runid})`,
                    }, {
                        name: 'Server',
                        value: `${server}`
                    })
                    .setColor(message.member.displayHexColor)
                    .setFooter('SourceJump.net', 'https://cdn.discordapp.com/icons/333865962568941568/cb2c94fee27c157485014f9e10d1ba26.webp?size=2048');
                message.channel.send(embed);
            })
        } catch (err) {
            console.log(err);
        }
    },
};