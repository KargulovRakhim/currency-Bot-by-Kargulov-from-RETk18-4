import fs from 'fs';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

function readConfig() {
    return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
}

const config = readConfig();

function createBot() {
    return new TelegramBot(config.botToken, { polling: true });
}

function logMessage(msg) {
    console.log(`Received message=${msg.text} from user=${msg.from.id},${msg.from.username}, chatId=${msg.chat.id}`);
}
function resolveRatesText(handler) {
    axios.get('http://currate.ru/api/', {
        params: {
            get: "rates",
            key: config.currencyApiKey,
            pairs: config.currencyRates.join(",")
        }
    })
        .then(function (response) {
            var data = response.data;
            console.log(data);
            if (data.status != 200) {
                handler("Please try again later");
                return;
            }
            var text = "*_Current currency rates are:_* \n\n";
            var rates = data.data;
            for (var rateKey of Object.keys(rates)) {
                var rateValue = rates[rateKey];
                text += `*${rateKey.replace("KZT", "/KZT")}:* ${rateValue.replace(".", "\\.")} KZT \n`;
            }
            text += "\n Data was fetched from https://currate\\.ru";
            text += "\n Dev: https://t\\.me/Kargulov\\_Rakhim"
            handler(text);
        })
        .catch(function (error) {
            console.log(error);
            handler("Error has occured. Please try again later")
        });
}



function listenForStartCommand(bot) {
    bot.onText(/\/start/, (msg) => {
        logMessage(msg);
        var chatId = msg.chat.id;
        bot.sendMessage(chatId,
            "Hello, u can get actual rates for currencies, just send me the /rates command.");
    });
}
function listenForRatesCommand(bot) {
    bot.onText(/\/rates/, (msg) => {
        logMessage(msg);
        var chatId = msg.chat.id;
        resolveRatesText((text) =>
            bot.sendMessage(chatId, text, { parse_mode: "MarkdownV2" }));
    });
}

const bot = createBot();

listenForStartCommand(bot);
listenForRatesCommand(bot);

console.log("Listening for commands....");


