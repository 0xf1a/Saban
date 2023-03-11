const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { networkStateChangeHandler } = require('./fix.js');

const ytdl = require("discord-ytdl-core");

class Player {
    constructor() {
        this.connection = null;
        this.player = null;
        this.stream = null;
        this.resource = null;
        this.queue = [];
    }

    startPlaying(channel) {
        if (!this.connection) {
            this.connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            /* api fix */
            this.connection.on('stateChange', (oldState, newState) => {
                Reflect.get(oldState, 'networking')?.off('stateChange', networkStateChangeHandler);
                Reflect.get(newState, 'networking')?.on('stateChange', networkStateChangeHandler);
            });

            this.player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Continue,
                },
            });
            this.player.on('idle', () => {
                this.playNextSong();
            })
            this.player.on('error', error => {
                console.error(error);
            });

            this.connection.subscribe(this.player);

            this.playSong();
        }
    }

    playSong(begin = 0) {
        if (this.getCurrentSong()) {
            this.stream = ytdl(this.getCurrentSong(), {
                filter: "audioonly",
                opusEncoded: true,
                seek:begin
            });
			
            this.resource = createAudioResource(this.stream);
            this.player.play(this.resource);
        } else {
            this.destroyPlayer();
        }
    }

    fastForward(ff) {

        let duration = Number(this.resource.playbackDuration / 1000);
        this.playSong(duration + ff);
    }

	seek(time) {
		let tt = time.split(":");
		if (tt.length != 2)
		{
			return false;
		}

		let sec=Number(tt[0])*60 + Number(tt[1])*1;
        this.playSong(sec);
		return true;
    }

    destroyPlayer() {

        this.resource = null; 
        this.stream = null;
        this.player = null; 
        this.connection.destroy();
        this.connection = null;
    }
    playNextSong() {
        this.skipSong();
        this.playSong();
    }

    addSong(url) {
        this.queue.push(url);
    }

    skipSong() {
        return this.queue.shift();
    }

    getCurrentSong() {
        return this.queue[0];
    }

    getQueueLength() {
        return this.queue.length;
    }

    isQueueEmpty() {
        return this.getQueueLength() === 0;
    }

    clearQueue() {
        this.queue = [];
    }

    serializeQueue() {
        return this.queue.join("\n");
    }
}

let playerInstance = new Player();

module.exports = {
    playerInstance
};