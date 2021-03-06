const fs = require('fs')
module.exports = (client, message) => {
    if (new RegExp(fs.readFileSync('./blacklist.txt', 'utf8').split(',').join("|")).test(message.content.toLowerCase()) && !message.content.includes('touko!blacklist remove') && message.channel.type !== 'dm') {
        message.delete();
    }
    if (message.author.bot || message.channel.type === 'dm') return;
    if (message.content.toLocaleLowerCase().indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    try {
        command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!\n```' + error + '```');
    }
  };