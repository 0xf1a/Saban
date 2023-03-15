const { SlashCommandBuilder } = require('discord.js');
const { playerInstance } = require('../player.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays YouTube music')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('YouTube URL or name of song')
                .setRequired(true)),
    async execute(interaction) {
        let query = interaction.options.get('query');
        let response = await playerInstance.addSong(query.value);
        if (!playerInstance.isQueueEmpty()) {
            playerInstance.startPlaying(interaction.member.voice.channel);
        }
        await interaction.reply(response);
    },
};
