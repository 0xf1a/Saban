const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song'),
    async execute(interaction) {
        if (!playerInstance.player) {
            await interaction.reply('No songs are currently being played.');
        } else {
            playerInstance.player.stop();
            await interaction.reply('Skipping...');
        }
    },
};
