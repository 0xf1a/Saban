const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Go to a specific time in the song')
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('Supported format is mm:ss')
                .setRequired(true)),
    async execute(interaction) {
        if (!playerInstance.player) {
            await interaction.reply('No songs are currently being played.');
        } else {
            let time = interaction.options.get('time');
            if (!playerInstance.seek(time.value)) {
                await interaction.reply('Incorrect time format or value!');
            } else {
                await interaction.reply('Seeking...');
            }
        }
    },
};
