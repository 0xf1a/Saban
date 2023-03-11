const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ff')
        .setDescription('Fast forward the music')
        .addNumberOption(option =>
            option
                .setName('seconds')
                .setDescription('How many seconds?')
                .setRequired(true)),
    async execute(interaction) {

        let ff = interaction.options.get('seconds');
    
        playerInstance.fastForward(ff.value);

        await interaction.reply('Fast forwarding..');
    },
};
