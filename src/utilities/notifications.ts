import { send_discord_notification } from "./discord";
import { DiscordMessage, DiscordField } from "../interfaces/discord";
import { config } from "../config";

/**
 * Sends a connection notification to discord
 * @param title - title shown in discord card
 * @param description - description shown in discord card
 * @param fields - extra fields shown in discord card
 */
function send_generic_message_notification(title: string, description: string, fields: DiscordField[] = []) {
    const message: DiscordMessage = {
        title: title,
        description: description,
        color: 0x00FF00,
        fields: fields
    }
    send_discord_notification(message);
}

export {
    send_generic_message_notification
}