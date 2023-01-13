import amqplib, { Connection, Channel, Message } from 'amqplib';
import { bull } from './queue';
import { reconectAmqpClient } from './workers/amqp_worker';
import { config } from './config';
import { send_rabbit_discconect_notification } from './utilities/amqp';

/**
 * Starts a connection with the RabbitMQ client and keeps it alive in background for listening
 * to the new messages
 * If connection is lost, it queue a new instance of the client and schedule it to a certain
 * amount of time defined by the enviroment variable recconection_delay
 * 
 * @param host - rabbitmq host
 * @param queue - rabbitmq queue
 */
async function RabbitClient(host: string, queue: string): Promise<void> {
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
            console.log('[x] Connection with RabbitMQ client closed...');
            send_rabbit_discconect_notification();
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
