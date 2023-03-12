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
        if (!playerInstance.getPlayer()) {
            await interaction.reply({content:'No songs are currently being played.',ephemeral: true});
        } else {
            let time = interaction.options.get('time');
            if (!playerInstance.seek(time.value)) {
                await interaction.reply({content:'Incorrect time format or value!', ephemeral: true});
            } else {
                await interaction.reply('Seeking...');
            }
        }
    },
};
