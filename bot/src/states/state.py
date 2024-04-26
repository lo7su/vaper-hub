from ..handlers import handlers

command_handlers = {
    '/start': handlers.handle_start,
    '/profile': handlers.handle_profile,
    '/checkout': handlers.handle_checkout,
    '/support': handlers.handle_support
}

from ..callbacks import callbacks

command_callbacks = {
    'order': callbacks.call_order,
    'profile': callbacks.call_profile,
    'back_to_start': callbacks.call_back_to_start
}