const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music (queue will be cleared and the bot will disconnect)'),
    async execute(interaction) {
        if (!playerInstance.player) {
            await interaction.reply('No songs are currently being played.');
        } else {
            playerInstance.clearQueue();
            playerInstance.player.stop();
            await interaction.reply('Stopped.');
        }
    },
};
