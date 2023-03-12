const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the music'),
    async execute(interaction) {
        if (!playerInstance.getPlayer()) {
            await interaction.reply('No songs are currently being played.');
        } else {
            playerInstance.pause();
            await interaction.reply('Paused.');
        }
    },
};
