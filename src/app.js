import tmi from 'tmi.js'
import { BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS } from './constants'

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

	if (userstate.username === BOT_USERNAME) return;


	if(message.toLowerCase() === '!ahoj') {
		client.say(channel, `@${userstate.username}, nazdar!`);
	}

	checkTwitchChatt (userstate, message, channel);
	
});
		

function checkTwitchChatt(userstate, message, channel) {
	message = message.toLocaleLowerCase() 
	let shouldSendMessage = false;
	//zkontroluj zpravu
	shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLocaleLowerCase()))
		
	if (shouldSendMessage) {
		//varuj uzivatele
		client.say(channel, `@${userstate.username},omluváme se! Vaše zpráva byla smazaná.`)
		//smaz zpravu
		client.deletemessage(channel, userstate.id)
	}
}