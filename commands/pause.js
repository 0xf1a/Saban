const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the music'),
    async execute(interaction) {
        if (playerInstance.player) {
            playerInstance.player.pause();
        }
        await interaction.reply('Paused.');
    },
};
