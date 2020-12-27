require("dotenv").config();
const Telegraf = require("telegraf");

const { BOT_TOKEN, URL } = process.env;
const PORT = process.env.PORT || 5000;
const bot = new Telegraf(BOT_TOKEN);

//CONSTANTS
const STICKER_SET_NAME = "fractalBand";

const call = {
  17: {
    who: "@Rostyslavmarchuk440",
  },
  18: {
    who: "@ginger_boy14",
  },
  19: {
    who: "@rttsu",
  },
  20: {
    who: "@ol_shvchk",
  },
  21: {
    who: "@okrdima",
  },
  22: {
    who: "@sash_k_a",
  },
  23: {
    who: "@Aleksandr_Golyk",
  },
};

bot.start((ctx) => ctx.reply("Hello Fractal Band"));
bot.help((ctx) => ctx.reply("Call someone from band"));

bot.on("sticker", (ctx) => {
  if (ctx.message.sticker.set_name === STICKER_SET_NAME) {
    ctx
      .getStickerSet(ctx.message.sticker.set_name)
      .then((sticker) => {
        const id = sticker.stickers.findIndex(
          ({ file_id }) => file_id === ctx.message.sticker.file_id
        );
        return ctx.reply(call[id].who);
      })
      .catch((err) => ctx.reply(`Maxim invalid =( ${err}`));
  }
});

if (process.env.NODE_ENV === "production") {
  bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
} else {
  bot.launch().then((res) => console.log("bot lounched"));
}

//https://salty-retreat-77317.herokuapp.com/
