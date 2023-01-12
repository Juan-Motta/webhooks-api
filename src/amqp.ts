import amqplib, { Connection, Channel, Message } from 'amqplib';
import { bull } from './queue';
import { reconectAmqpClient } from './workers/amqp_worker';
import { config } from './config';

async function RabbitClient(host: string, queue: string) {
    try{
        const client: Connection = await amqplib.connect(host);
        const channel: Channel = await client.createChannel();
        console.log('[x] Connected to rabbitMQ');
        await channel.assertQueue(queue);
        await channel.consume(queue, async (message: Message | null) => {
            if (message) {
                console.log(message.content.toString());
                channel.ack(message);
            }
        });
        channel.on('close', async function() {
            console.log('close');
            bull.process(reconectAmqpClient);
            bull.add({}, {delay: config.rabbit.reconnection_delay})
        })
    } catch (e) {
        console.log(e);
    }
}

export {
    RabbitClient
}
