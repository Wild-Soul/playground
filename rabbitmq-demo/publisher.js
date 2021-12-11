const amqp = require("amqplib");

async function connect() {
    try {
        // create a connection to rabbitmq server
        const connection = await amqp.connect("amqp://localhost:5672");
        // create a channel, 'cause message are sent via channel
        const channel = await connection.createChannel();
        // make sure that the queue we're pushing to exists, if not it'll create a new one.
        const result = await channel.assertQueue("jobs");
        // send the job
        let message = process.argv[2];
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log("Job sent successfully, msg:", message);
        // we can close the connection now since jobs is sent.

    } catch (err) {
        console.error("[ERROR Publisher Jobs]: ", err);
    }
}

connect();
