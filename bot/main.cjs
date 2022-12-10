var amqp = require('amqplib');


async function call_back(cb) {

    const conn = await amqp.connect('amqp://127.0.0.1');
    const channel = await conn.createChannel();
    channel.prefetch(1);

    await channel.consume('qq', async function (msg) {
        var msg_str = msg.content.toString();
        var content = msg_str.substring(msg_str.indexOf("：")+1);
        console.log("Received:", msg_str);
        if(content.length <= 2){
            console.log("Ignore");
        }else{
            await cb(msg_str);
        }
        channel.ack(msg);
    }, { noAck: false });

}

module.exports = call_back;
