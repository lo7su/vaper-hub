import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";

class TelegramState {

    telegramm = {};
    initState = '';

    constructor() {
        makeAutoObservable(this);
        this.telegramm = window.Telegram.WebApp;
        this.telegramm.ready();
        console.log(this.telegramm);
    }

    sendWebhook = async (data) => {
        try {
            const response = await axios.post('https://webhook.site/101fed78-c70a-458d-bb8a-01737e14dca4', data);

        } catch (error) {
            console.error("Failed to fetch puffs:", error);
        }
    }
}

export default new TelegramState();
