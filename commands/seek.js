const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Go to a specific time in the song')
        .addStringOption(option =>
            option
                .setName('hours')
                .setDescription('Hours in format hh:mm:ss')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('minutes')
                .setDescription('Minutes in format hh:mm:ss')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('seconds')
                .setDescription('Seconds in format hh:mm:ss')
                .setRequired(true)),
    async execute(interaction) {
        if (!playerInstance.getPlayer()) {
            await interaction.reply({content: 'No songs are currently being played.', ephemeral: true});
        } else {
            let hours = interaction.options.get('hours');
            let minutes = interaction.options.get('minutes');
            let seconds = interaction.options.get('seconds');
            let status = await playerInstance.seek(hours.value, minutes.value, seconds.value);
            if (!status) {
                await interaction.reply({content: 'Cannot seek to that specific time.', ephemeral: true});
            } else {
                await interaction.reply('Seeking...');
            }
        }
    },
};
