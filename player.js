const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { Queue } = require('./queue.js');
const { Song } = require('./song.js');
const { networkStateChangeHandler } = require('./fix.js');
const play = require('play-dl');

class Player {
    constructor() {
        this.connection = null;
        this.player = null;
        this.source = null;
        this.resource = null;
        this.queue = new Queue();
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

    getPlayer() {
        return this.player;
    }

    destroyPlayer() {
        this.resource = null;
        this.source = null;
        this.player = null;
        if (this.connection) {
            this.connection.destroy();
        }
        this.connection = null;
        this.queue.clear();
    }

    async playSong(begin = 0) {
        if (this.getFirstSong()) {
            if (begin >= this.getFirstSong().duration) {
                return false;
            }
            this.source = await play.stream(this.getFirstSong().url, {
                seek: String(begin)
            });
            this.resource = createAudioResource(this.source.stream, {
                inputType: this.source.type
            });
            this.player.play(this.resource);
        } else {
            this.destroyPlayer();
        }
        return true;
    }

    playNextSong() {
        this.queue.dequeue();
        this.playSong();
    }

    stop() {
        this.queue.clear();
        this.player.stop();
    }

    skip() {
        this.player.stop();
    }

    pause() {
        this.player.pause();
    }

    continue() {
        this.player.unpause();
    }

    async fastForward(ff) {
        let duration = Number(this.resource.playbackDuration / 1000);
        return this.playSong(duration + ff);
    }

    async seek(hours, minutes, seconds) {
        let sec = Number(hours) * 60 * 60
                + Number(minutes) * 60
                + Number(seconds);
        return this.playSong(sec);
    }

    async addSong(query) {

        let url = '';
        let type = play.yt_validate(query);

        if (type === 'video' && query.startsWith('https')) {
            url = query;
        } else if (type === 'search') {
            const searched = await play.search(query, {source: {youtube: 'video'}, limit: 1});
            if (searched.length) {
                url = searched[0].url;
            }
        }

        if (url) {
            let info = await play.video_basic_info(url);
            let song = new Song(url, info.video_details.durationInSec);
            this.queue.enqueue(song);
            return true;
        }

        return false;
    }

    isQueueEmpty() {
        return this.queue.empty();
    }

    serializeQueue() {
        return this.queue.serialize();
    }

    getFirstSong() {
        return this.queue.first();
    }

    getLastSong() {
        return this.queue.last();
    }
}

let playerInstance = new Player();

module.exports = {
    playerInstance
};