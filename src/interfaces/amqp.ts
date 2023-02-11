interface AmqpMessage {
    service_id: number
    user_id: number
    event: string
}

export {
    AmqpMessage
}