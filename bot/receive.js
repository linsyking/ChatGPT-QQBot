import * as amqp from 'amqplib';
import { cin } from './config.js';

export async function receive(cb, filter) {

    const conn = await amqp.connect('amqp://127.0.0.1');
    const channel = await conn.createChannel();
    channel.prefetch(1);

    await channel.consume('qq', async function (msg) {
        var msg_str = msg.content.toString();
        // Filter group/id
        var data = JSON.parse(msg_str);
        if ((cin["type"] == "private" && data.user_id && data.user_id == cin["id"]) || (cin["type"] == "group" && data.group_id && data.group_id == cin["id"])) {
            const response = await filter(data);
            if (response) {
                console.log("Get:", msg_str);
                await cb(response);
            } else {
                console.log("Filtered msg");
            }
        }
        channel.ack(msg);
    }, { noAck: false });

}
