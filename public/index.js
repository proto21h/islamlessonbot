//require('dotenv').load();
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Ассаляму алейкум ва рахматуЛлаhи ва баркатуh: '))
bot.help((ctx) => ctx.reply('https://www.youtube.com/watch?v=ONYbtdCgNjo'))
bot.on('sticker', (ctx) => ctx.reply(''))
bot.hears('пинг', (ctx) => ctx.reply('понг!'))
bot.launch()
