module.exports = {
    name: 'ping',
    cooldown: 2.5,
    description: 'Ping!',
    guildOnly: true,
    permissions: false,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};