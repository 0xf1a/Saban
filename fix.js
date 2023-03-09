// https://github.com/discordjs/discord.js/issues/9185

const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
    const newUdp = Reflect.get(newNetworkState, 'udp');
    clearInterval(newUdp?.keepAliveInterval);
}

module.exports = { networkStateChangeHandler };