const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue playing the music'),
    async execute(interaction) {
        if (playerInstance.player) {
            playerInstance.player.unpause();
        }
        await interaction.reply('Continuing...');
    },
};
