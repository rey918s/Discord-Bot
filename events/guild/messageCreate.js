require("dotenv").config();
const prefix = process.env.PREFIX;

module.exports = async (client, discord, message) => {

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (command) command.execute(client, message, args, discord);
  if (!command) return;
};