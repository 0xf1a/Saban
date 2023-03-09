const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music'),
    async execute(interaction) {
        playerInstance.clearQueue();
        if (playerInstance.player) {
            playerInstance.player.stop();
        }
        await interaction.reply('Stopped.');
    },
};
