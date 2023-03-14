const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays YouTube music')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('YouTube URL')
                .setRequired(true)),
    async execute(interaction) {
        let url = interaction.options.get('url');
        if(playerInstance.validateUrl(url.value)) {
            playerInstance.addSong(url.value);
            playerInstance.startPlaying(interaction.member.voice.channel);
            await interaction.reply('Added to queue: ' + url.value);
        } else {
            await interaction.reply('URL is not valid!');
        }
    },
};
