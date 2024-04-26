from telebot import types
from telebot.async_telebot import AsyncTeleBot
from ..states import state
from ..configs import config

bot = AsyncTeleBot(config.BOT_TOKEN)

@bot.message_handler()
async def handlers(message):
    handler = state.command_handlers.get(message.text)
    if handler:
        await handler(message)
    else:
        await bot.send_message(message.chat.id, f"Команда не найдена. {handler}")

@bot.callback_query_handler(func=lambda call: True)
async def callbacks(call):
    callback = state.command_callbacks.get(call.data)
    if callback:
        await callback(call)
    else:
        await bot.send_message(call.message.chat.id, f"Колбек не найден. {callback}")

@bot.message_handler(content_types=types.SuccessfulPayment)
async def succeful_payment(message):
    await bot.answer_callback_query(message.chat.id, "Заказ принят!")  # Отправить уведомление пользователю
    await bot.send_message(message.chat.id, "Спасибо за ваш заказ!")

import asyncio
asyncio.run(bot.polling())
        

