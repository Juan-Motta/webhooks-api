import { ColorResolvable } from "discord.js"

interface DiscordMessage {
    title: string,
    description: string,
    color: ColorResolvable,
    fields: DiscordField[]
}

interface DiscordField {
    name: string,
    value: string
}

export {
    DiscordMessage,
    DiscordField
}