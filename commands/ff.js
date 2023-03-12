const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ff')
        .setDescription('Fast forward the music')
        .addNumberOption(option =>
            option
                .setName('seconds')
                .setDescription('How many seconds to fast forward')
                .setRequired(true)),
    async execute(interaction) {
        if (!playerInstance.player) {
            await interaction.reply('No songs are currently being played.');
        } else {
            let seconds = interaction.options.get('seconds');
            playerInstance.fastForward(seconds.value);
            await interaction.reply('Fast forwarding...');
        }
    },
};
