import amqplib, { Connection, Channel, Message } from 'amqplib';
import { bull } from './queue';
import { reconectAmqpClient } from './workers/amqp_worker';
import { config } from './config';
import { send_generic_message_notification } from './utilities/notifications';
import { executeWebhook } from './workers/webhook_worker';

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
    const channel: Channel = await connect(host, queue)
    console.log('[x] RabbitMQ ... OK');
    await channel.assertQueue(queue);
    await executeWebhook(channel, queue)
    channel.on('close', async function() {
        console.log('[x] Connection with RabbitMQ client closed...');
        send_generic_message_notification(
            'Rabbit connection lost ⚠️',
            `Connection with RabbitMQ client lost, next reconnection retry in ${config.rabbit.reconnection_delay/1000} s.`
        )
        bull.process(reconectAmqpClient);
        bull.add({}, {delay: config.rabbit.reconnection_delay})
    });
}

async function connect(host: string, queue: string): Promise<Channel> {
    const client: Connection = await amqplib.connect(host)
    const channel: Channel = await client.createChannel()
    return channel
}

export {
    RabbitClient
}
