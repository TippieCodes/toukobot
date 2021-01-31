const utils = require("../utils.js");
const roster = require("../roster.js")
module.exports = {
    name: 'eval',
    description: 'Debug Command',
    execute(client, message, args) {
        if(message.author.id !== client.config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(utils.clean(evaled), {code: "xl"}).then().catch(e => {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${utils.clean(e)}\n\`\`\``);
                return;
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${utils.clean(err)}\n\`\`\``);
            return;
        }
    },
};