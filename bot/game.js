import { ChatGPTAPI } from 'chatgpt'
import { send } from './send.js'
import { receive } from './receive.js'
import { sessionToken } from "./config.js"

import { init_prompt, send_handler, receive_handler } from './plugins/chat.js'

async function exec() {
    // sessionToken is required; see below for details
    const api = new ChatGPTAPI({
        sessionToken: sessionToken
    })

    const conversation = api.getConversation();

    async function get_r(msg) {
        const response = await conversation.sendMessage(msg);
        const m_res = await send_handler(response);
        if (m_res) {
            await send(m_res);
        }else{
            console.log("No response");
        }
    }

    await get_r(init_prompt);
    receive(get_r, receive_handler);
}

exec();
