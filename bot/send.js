import * as amqp from 'amqplib';
import { group_text, private_text } from "./sendsyn.js";
import { cout } from './config.js';

export async function send(msg) {
    const conn = await amqp.connect('amqp://127.0.0.1');
    const channel = await conn.createChannel();
    console.log("Sending:", msg);
    if (cout.type == "group") {
        msg = group_text(cout.id, msg);
    } else {
        msg = private_text(cout.id, msg);
    }
    channel.sendToQueue("qqsend", Buffer.from(msg));
}

