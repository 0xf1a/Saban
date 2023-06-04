const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song'),
    async execute(interaction) {
        if (!playerInstance.getPlayer()) {
            await interaction.reply({content: 'No songs are currently being played.', ephemeral: true});
        } else {
            playerInstance.skip();
            await interaction.reply('Skipping...');
        }
    },
};
