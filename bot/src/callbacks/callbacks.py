import telebot
from telebot.async_telebot import AsyncTeleBot
from ..configs import config
from ..handlers import handlers

bot = AsyncTeleBot(config.BOT_TOKEN)

async def call_order(call):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.row(telebot.types.InlineKeyboardButton('Открыть каталог', web_app=telebot.types.WebAppInfo(url="https://vaper-hub.ru/catalog")), telebot.types.InlineKeyboardButton("Назад", callback_data="back_to_start"))
    await bot.send_message(call.message.chat.id, "Нажав на кнопку 'Открыть каталог' у вас откроется каталог, где вы можете выбрать товары, которые необходимо заказать!", reply_markup=markup)

async def call_profile(call):
    await bot.answer_callback_query(call.id, "Тестовый запрос получен.")
    await bot.send_message(call.message.chat.id, "Это был тестовый запрос.")

async def call_back_to_start(call):
    await handlers.handle_start(call.message)