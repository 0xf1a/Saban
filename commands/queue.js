const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Get the song queue'),
    async execute(interaction) {
        if (playerInstance.isQueueEmpty()) {
            await interaction.reply('Queue is empty.');
        } else {
            await interaction.reply(playerInstance.serializeQueue());
        }
    },
};
