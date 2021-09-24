import tmi from 'tmi.js'
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME } from './constants';

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        seruce: true
    },
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}


const client = new tmi.Client(options);

client.connect();

client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!ahoj') {
		client.say(channel, `@${userstate.username}, nazdar!`);
	}
});
		