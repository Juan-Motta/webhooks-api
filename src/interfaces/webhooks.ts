interface Webhook {
    id: number
    user_id: number
    event_pattern: string
    webhook_url: string
    headers: object
    payload: string
    method: string
    attemps: number
}

export {
    Webhook
}