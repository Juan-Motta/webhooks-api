import { send_discord_notification } from "./discord";
import { DiscordMessage } from "../interfaces/discord";
import { config } from "../config";

/**
 * Sends a connection notification to discord
 */
function send_rabbit_connection_notification() {
    const message: DiscordMessage = {
        title: 'Rabbit connection lost ⚠️',
        description: `Connection with RabbitMQ client lost, next reconnection retry in ${config.rabbit.reconnection_delay/1000} s.`,
        color: 0xFF0000,
        fields: []
    }
    send_discord_notification(message);
}

/**
 * Sends a disconnect notification to discord
 */
function send_rabbit_discconect_notification() {
    const message: DiscordMessage = {
        title: 'Rabbit connected ✅',
        description: `Rabbit connection has succesfully stablished`,
        color: 0x00FF00,
        fields: []
    }
    send_discord_notification(message);
}

export {
    send_rabbit_connection_notification,
    send_rabbit_discconect_notification
}