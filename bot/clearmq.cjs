var amqp = require('amqplib');


async function clean() {

    const conn = await amqp.connect('amqp://127.0.0.1');
    const channel = await conn.createChannel();
    channel.prefetch(1);

    await channel.consume('qq', async function (msg) {
        var msg_str = msg.content.toString();
        console.log("Received:", msg_str);
        channel.ack(msg);
    }, { noAck: false });

}

clean();
