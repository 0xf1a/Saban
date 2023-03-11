const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('seek the music')
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('mm:ss?')
                .setRequired(true)),
    async execute(interaction) {

        let ff = interaction.options.get('time');
    
        if(!playerInstance.seek(ff.value))
        {
            await interaction.reply('wrong format (mm:ss)');
        }
        else
        {
            await interaction.reply('seeking...');

        }
    },
};
