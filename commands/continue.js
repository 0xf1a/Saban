const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('continue')
        .setDescription('Continue playing the music'),
    async execute(interaction) {
        if (!playerInstance.player) {
            await interaction.reply('No songs are currently being played.');
        } else {
            playerInstance.player.unpause();
            await interaction.reply('Continuing...');
        }
    },
};
