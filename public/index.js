require('dotenv').config()
const axios = require('axios'); // add axios
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(Telegraf.log())

const video_list = [
    'https://www.youtube.com/watch?v=JtsUhu8B6GU',
    'https://www.youtube.com/watch?v=OnTbp4_3b-o',
    'https://www.youtube.com/watch?v=dbn60QSC4pc',
];

//let lessons_list = ['Вероубеждения','Коран', 'Фикх', 'Хадисы']
bot.start((ctx) => ctx.reply('Выберите интересующий раздел в меню:'))
//bot.help((ctx) => ctx.reply('Нажмите на иконку вызова меню слева от кнопки emoji'))
//bot.on('sticker', (ctx) => ctx.reply(''))
//bot.command('lessons', (ctx)=> ctx.reply(lessons_list[1]))
bot.hears('ping', (ctx) => ctx.reply('понг!'))




// bot.command('onetime', ({ reply }) =>
//   reply('One time keyboard', Markup
//     .keyboard(['Вероубеждения', 'Коран', 'Фикх', 'Хадисы'])
//     .oneTime()
//     .resize()
//     .extra()
//   )
// )  


bot.command('menu', ({ reply }) => {
  return reply('Выберите раздел:', Markup
    .keyboard([
      ['☝️ Вероубеждение', '📖 Коран', '⚖️ Фикх'], // Row1 with 2 buttons
      ['📜 Хадисы', '✋ Адаб'] // Row2 with 2 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

bot.hears('📖 Коран', ctx => ctx.reply('https://quran-online.ru/!'))
bot.hears('☝️ Вероубеждение', ctx => {
  return ctx.reply('', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Три основы', 'ссылка на книгу'),
      m.callbackButton('Основы исламской акиды', 'ссылка на книгу'),
      m.callbackButton('Четыре правила', 'ссылка на книгу')
    ])
  ))
})

bot.command('special', (ctx) => {
  return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
    return markup.resize()
      .keyboard([
        markup.contactRequestButton('Send contact'),
        markup.locationRequestButton('Send location')
      ])
  }))
})

bot.command('pyramid', (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    })
  ))
})

bot.command('simple', (ctx) => {
  return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
    Markup.keyboard(['Coke', 'Pepsi'])
  ))
})

bot.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})

bot.command('random', (ctx) => {
  return ctx.reply('random example',
    Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ]).extra()
  )
})

bot.command('caption', (ctx) => {
  return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
    Extra.load({ caption: 'Caption' })
      .markdown()
      .markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Plain', 'plain'),
          m.callbackButton('Italic', 'italic')
        ])
      )
  )
})

/*bot.hears(/\/wrap (\d+)/, (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      columns: parseInt(ctx.match[1])
    })
  ))
})

bot.action('Dr Pepper', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('plain', async (ctx) => {
  await ctx.answerCbQuery()
  await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('Italic', 'italic')
  ]))
})

bot.action('italic', async (ctx) => {
  await ctx.answerCbQuery()
  await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('* Italic *', 'italic')
  ])))
})

bot.action(/.+/, (ctx) => {
  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
}) */




bot.launch()
