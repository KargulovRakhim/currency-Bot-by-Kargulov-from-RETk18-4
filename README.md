Currency Bot by @Kargulov_Rakhim
---
## What is it?

This bot provides information about currency rates. It's getting it from https://currate.ru.

Everything is configurable.

## How to configure?

Configurations available by changing values inside `config.json` file.

Settings:
 - botToken = BotAPI token that can be resolved from @BotFather.
 - currencyApiKey = API Key for currate.ru, can be resolved by registration process on the site.
 - currencyRates = array of currency pairs that will be fetched from currate.ru.

## How to run?

 - Install NodeJS not lower than version 14x.
 - Adopt settings inside `config.json`.
 - In CLI type: `npm install`, then `npm start`.
 - After that go to a dialog with bot, and pass '/rates' command.
 - U will get something like:
 ```
 Current currency rates are: 

  USD/KZT: 376.086 KZT 
  EUR/KZT: 405.817 KZT 
  RUB/KZT: 5.85964 KZT 

  Data was fetched from https://currate.ru
  Dev: https://t.me/Kargulov_Rakhim
 ```

Or just run by double-clicking `run.bat`.

## Info for developers
### Dependencies
 - https://github.com/axios/axios = http client that used to send request to currate.ru.
 - https://github.com/yagop/node-telegram-bot-api = wrapper for Telegram's BotAPI.# currency-Bot-by-Kargulov-from-RETk18-4
