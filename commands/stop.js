const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music (queue will be cleared and the bot will disconnect)'),
    async execute(interaction) {
        if (!playerInstance.getPlayer()) {
            await interaction.reply({content: 'No songs are currently being played.', ephemeral: true});
        } else {
            playerInstance.stop();
            await interaction.reply('Stopped.');
        }
    },
};
