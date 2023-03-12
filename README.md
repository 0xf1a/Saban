# Šaban
 
Basic Discord music bot that can play YouTube URL's

# Setup

1. Create your application and bot in the Discord Developer Portal
2. Invite your bot to your server using the generated URL
3. Run `npm install` inside the root folder to get all the required packages
4. Create a `config.json` file inside the root folder like the example below and fill it with your own configuration variables
    ```json
    {
        "clientId": "...",
        "guildId": "...",
        "token": "..."
    }
   ```
5. Run `node index.js` to start your bot

# Usage/commands

- `play` Plays the song provided in the `url` option
- `pause`
- `continue`
- `skip`
- `stop` Clears the current queue and disconnects the bot from the voice channel
- `queue` Outputs the song queue including the song that is currently being played
- `ff` Fast forwards the current song for the number of seconds provided in the `seconds` option
- `seek` Goes to a specific time in the current song provided in the `time` option (supported format is `mm:ss`)
