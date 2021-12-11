const amqp = require("amqplib");

async function connect() {
    try {
        // create a connection to rabbitmq server
        const connection = await amqp.connect("amqp://localhost:5672");
        // create a channel, 'cause message are sent via channel
        const channel = await connection.createChannel();
        // make sure that the queue we're consuming from exists, if not it'll create a new one.
        const result = await channel.assertQueue("jobs");
        // consume the message.
        channel.consume("jobs", message => {
            let content = JSON.parse(message.content.toString());
            let messageToConsume = process.argv[2].toString();
            console.log("CURRENT CONSUMING MESSAGE:: ", messageToConsume);
            if(content == messageToConsume) {
                console.log("Message consumed successfully: ", content);
                channel.ack(message);
            }
        })

    } catch (err) {
        console.error("[ERROR Consumer Jobs]: ", err);
    }
}

connect();
