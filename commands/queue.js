const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Get the song queue'),
    async execute(interaction) {
		let reply = "Queue is empty";
		if (!playerInstance.isQueueEmpty()) {
            reply = playerInstance.serializeQueue();
        }
        await interaction.reply(reply);
    },
};
