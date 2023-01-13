import { EmbedBuilder, WebhookClient } from "discord.js";
import { config } from "../config";
import { DiscordMessage } from "../interfaces/discord";

/**
 * Sends a discord webhook notification to the spicified discord server
 * 
 * @param message - An object that contains the information used to build up the discord message
 */
function send_discord_notification(message: DiscordMessage) {
    const discord_client: WebhookClient = new WebhookClient({url: config.discord_url});
    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle(message.title)
        .setDescription(message.description)
        .setColor(message.color);
    if (message.fields.length > 0) {
        embed.addFields(...message.fields);
    }
    discord_client.send({
        embeds: [embed],
    });
}

export {
    send_discord_notification
}