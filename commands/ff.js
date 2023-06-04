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
        if (!playerInstance.getPlayer()) {
            await interaction.reply({content: 'No songs are currently being played.', ephemeral: true});
        } else {
            let seconds = interaction.options.get('seconds');
            let status = await playerInstance.fastForward(seconds.value);
            if (!status) {
                await interaction.reply({content: 'Cannot fast forward that many seconds.', ephemeral: true});
            } else {
                await interaction.reply('Fast forwarding...');
            }
        }
    },
};
