import { ChatGPTAPI } from 'chatgpt'
import { default as send } from './send.cjs'
import { default as receive } from './main.cjs'

async function exec() {
    // sessionToken is required; see below for details
    const api = new ChatGPTAPI({
        sessionToken: "<your session token>"
    })

    const conversation = api.getConversation()

    const init_response = await conversation.sendMessage('我非常希望你能作为群聊机器人和群友聊天。在接下来的聊天中，我会把群友的聊天记录发给你，请你生成一些回复。聊天的形式为xxx：yyy。其中xxx是说话人的姓名，yyy是他说的内容。你的名字是bot，你不能扮演其他群友，只能用bot发言。你不必对每一句话都回复，如果你不想回复，请回答暂无评论。首先请你自我介绍一下。')
    send(init_response);

    async function get_r(msg) {
        const response = await conversation.sendMessage(msg);
        // Filter
        if (response.indexOf("暂无评论") != -1) {
            console.log("filtered", response);
            return;
        }

        send(response.substring(5));
    }
    receive(get_r);
}

exec();
