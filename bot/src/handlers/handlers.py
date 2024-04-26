import telebot
from telebot.async_telebot import AsyncTeleBot
from ..configs import config


bot = AsyncTeleBot(config.BOT_TOKEN)


async def handle_start(message):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.row(telebot.types.InlineKeyboardButton("Заказать доставку", callback_data='order'), telebot.types.InlineKeyboardButton("Профиль", callback_data="profile"))
    await bot.send_message(message.chat.id, f"Привет <i>{message.from_user.first_name}</i>, ты попал в доставку электронных сигарет. Чтобы сделать заказ нажми кнопку 'Сделать заказ'", reply_markup=markup, parse_mode='html')

async def handle_profile(message):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.row(telebot.types.InlineKeyboardButton("Тест", callback_data='test'), telebot.types.InlineKeyboardButton("Тест2", callback_data='test2'))
    await bot.send_message(message.chat.id, "Это тест", reply_markup=markup)

async def handle_checkout(message):
    await bot.send_invoice(message.chat.id, 'Оплата доставки', 'Оплата доставки элекронных испарителей на дом', 'invoice', '381764678:TEST:82228', 'RUB', [telebot.types.LabeledPrice('Оплата доставки', 500000)])

async def handle_support(message):
    await bot.send_message(message.chat.id, 'Контакты поддержки: \b \b <b> Телефон: </b> 89649151505', parse_mode='html')