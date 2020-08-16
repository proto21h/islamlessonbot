require('dotenv').config()
const axios = require('axios'); // add axios
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup');
const { inlineKeyboard } = require('telegraf/markup');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(Telegraf.log())

//bot.start((ctx) => ctx.reply('Выберите интересующий раздел в меню:'))
/*
 bot.command('onetime', ({ reply }) =>
   reply('One time keyboard', Markup
     .keyboard(['Вероубеждения', 'Коран', 'Фикх', 'Хадисы'])
     .oneTime()
     .resize()
     .extra()
   )
 )  
*/

bot.start(({ reply }) => {
  return reply('Выберите раздел:', Markup
    .keyboard([
      ['☝️ Акида', '📖 Коран', '⚖️ Фикх'], // Row1 with 2 buttons
      ['📜 Хадисы', '✋ Адаб'] // Row2 with 2 buttons
    ])
    .resize()
    .extra()
  )
})

const aqidaBook = ['Три основы', 'Основы исламской акиды','Четыре правила']

const fikhList = ['']

let aqidaBtns = []

for (let item of aqidaBook) {
  aqidaBtns.push(Markup.urlButton(item,'https://google.com/'))
}


bot.hears('📖 Коран', ctx => ctx.reply('https://quran-online.ru/'))

bot.hears('☝️ Акида', ctx => ctx.reply('Выберите книгу: Три основы https://www.youtube.com/watch?v=2VNt6nW4w5s&list=PLMrFOgO9CPN-ktU8BRFtjRsB6KZcVc5ph&index=2&t=0s'))

bot.hears('📜 Хадисы', ctx => ctx.reply(`СОДЕРЖАНИЕ   КАНАЛА
  📒 «40 хадисов Ан-Навави»📗
  Толкование шейха Салих Али Шейха (PDF) 
  https://t.me/Sorokhadisov/288
  Толкование шейха Аль-Усаймина (PDF) 
  https://t.me/Sorokhadisov/289  
  Вопросы по книге «40 Ан-Навави» в формате  PDF: 
  - на арабском языке: https://t.me/Sorokhadisov/1632
  - на русском языке: https://t.me/Sorokhadisov/1634
  Подробный список тем, разбираемых в каждом хадисе:
   https://t.me/Sorokhadisov/1639

  Содержание первой части, с 1 по 21 хадисы: 
  https://t.me/Sorokhadisov/1640
  Содержание второй части с 22 по 42 хадисы: 
  https://t.me/Sorokhadisov/1641`))

   bot.hears('⚖️ Фикх', (ctx) => {
     return ctx.reply(
      `
      Исламский фикх:
      1️⃣ Фикх для начинающих
        @fikh_for_start
      2️⃣ Хамбалитский фикх для начинающих (Султан Абу Амин)
        @habal_fikh_start`
     )
   })

// bot.command('pyramid', (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['📖one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   ))
// })

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//     Markup.keyboard(['Coke', 'Pepsi'])
//   ))
// })

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi')
//     ])))
// })


// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//     Extra.load({ caption: 'Caption' })
//       .markdown()
//       .markup((m) =>
//         m.inlineKeyboard([
//           m.callbackButton('Plain', 'plain'),
//           m.callbackButton('Italic', 'italic')
//         ])
//       )
//   )
// })

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   ))
// })

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next())
// })

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('Italic', 'italic')
//   ]))
// })

// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('* Italic *', 'italic')
//   ])))
// })

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// }) 




bot.launch()
