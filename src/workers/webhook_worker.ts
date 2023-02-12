import { Message, Channel } from 'amqplib';
import { Webhook } from "../interfaces/repository/webhooks";
import { getWebhook } from "../services/queries/webhooks";
import { Service } from "../interfaces/repository/services";
import { getServiceById } from "../services/queries/services";
import { AmqpMessage } from '../interfaces/amqp';
import { send_generic_message_notification } from '../utilities/notifications';
import { formatString } from '../utilities/format';
import { sendHttpNotification } from '../utilities/fetch';

/**
 * Consumes the message sent in rabbit, sent the acknowledge notification, parse the string
 * literal to transform it into an object literal and pass it to sendWebhook function
 * If en error is thrown, it reports the error to discord function to be notified
 * @param channel - rabbit channel instance
 * @param queue - queue string
 */
async function executeWebhook(channel: Channel, queue: string) {
    await channel.consume(queue, async (rawMessage: Message | null) => {
        if (rawMessage) {
            channel.ack(rawMessage);
            try {
                const message: AmqpMessage = JSON.parse(rawMessage.content.toString());
                await sendWebhook(message);
            } catch (error) {
                console.error(`[x] Error 002: ${error}`);
                send_generic_message_notification(
                    'Invalid message ⚠️',
                    `Invalid message structure received from RabbitMQ notification`,
                    [{
                        name: "payload",
                        value: rawMessage.content.toString()
                    }]
                )
            }
        }
    })
}

/**
 * Recieves an object literal, validates if it contains user_id and event key, if so, look up
 * for the related records that contains the service info and then retrieves the webhook record 
 * that contains the webhook structure that is going to be replaces with the service info
 * @param message - object literal that contains info about service, user and event
 */
async function sendWebhook(message: AmqpMessage) {
    if (message.user_id === undefined || message.event === undefined) {
        send_generic_message_notification(
            'Webhook message validation error 🔴',
            'user_id or event not found in message object',
            [{
                name: "payload", 
                value: JSON.stringify(message)
            }]
        );
        throw new Error(`[x] Error 003 user_id or event not found`);
    }
    const webhooks: Webhook[] = await findWebhook(message.user_id, message.event);
    if (webhooks.length === 0) {
        throw new Error(`[x] Warning 004: event ${message.event} not found for ${message.service_id}`)
    }
    const service: Service = await getServiceById(message.service_id);
    webhooks.map(async (webhook: Webhook) => {
        const data: object = formatString(webhook.payload, service);
        const headers = webhook.headers;
        await sendHttpNotification(webhook.webhook_url, webhook.method, data, headers);  
    })
}

/**
 * Retrieves webhook records from db
 * @param userId - user id
 * @param event - event string
 */
async function findWebhook(userId: number, event: string) {
    const webhooks: Webhook[] = await getWebhook(userId, event);
    return webhooks;
}

export {
    executeWebhook
}