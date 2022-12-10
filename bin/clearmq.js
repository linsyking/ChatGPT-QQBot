#!/usr/bin/env node

// Clean all messages in the queue

import * as amqp from 'amqplib';

async function clean() {

    const conn = await amqp.connect('amqp://127.0.0.1');
    const channel = await conn.createChannel();
    channel.prefetch(1);

    await channel.consume('qq', async function (msg) {
        var msg_str = msg.content.toString();
        console.log("Received:", JSON.parse(msg_str));
        channel.ack(msg);
    }, { noAck: false });

}

clean();
