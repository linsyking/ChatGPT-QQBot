var amqp = require('amqplib/callback_api');

function send_resposne(msg) {
    amqp.connect('amqp://127.0.0.1', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'qqsend';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log("Sending:", msg);
            channel.sendToQueue(queue, Buffer.from(msg));

        });
    });

}

module.exports = send_resposne;
