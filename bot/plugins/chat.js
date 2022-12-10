// Sample Plugin

// Group Chat

export const init_prompt = '我非常希望你能作为群聊机器人和群友聊天。在接下来的聊天中，我会把群友的聊天记录发给你，请你生成一些回复。聊天的形式为xxx：yyy。其中xxx是说话人的姓名，yyy是他说的内容。你的名字是King，你不能扮演其他群友，只能用King发言。你不必对每一句话都回复，如果你不想回复，请回答暂无评论。首先请你自我介绍一下。';


export async function send_handler(msg) {
    // msg is the response generated by the chatGPT
    // return a string or none

    if (msg.indexOf("暂无评论") != -1) {
        return;
    }

    // send to QQ
    return msg;
}

export async function receive_handler(data) {
    // data is the chat message from QQ, decide if you want to send it to openGPT
    // return null if you don't want to send anything
    // data can be from any group/private.
    // return a string that you filtered (modified)

    let msg_string;

    // Send to gpt
    if (data.message[0]["type"] === "text") {
        msg_string = data.message[0]["data"]["text"]
    } else if (data.message[0]["type"] === "at" && data.message[1]["type"] === "text") {
        // at someone
        msg_string = data.message[0]["data"]["text"] + "，" + data.message[1]["data"]["text"]
    } else {
        console.log(data.message[0]["type"], "is not text")
        return;
    }
    var real_sq = msg_string;
    if (data.group_id) {
        real_sq = data.sender["nickname"] + "：" + msg_string;
    }
    console.log("outputing:", real_sq);
    return (real_sq)
}
