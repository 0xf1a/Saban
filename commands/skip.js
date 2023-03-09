const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song'),
    async execute(interaction) {
        if (playerInstance.player) {
            playerInstance.player.stop();
        }
        await interaction.reply('Skipped.');
    },
};
