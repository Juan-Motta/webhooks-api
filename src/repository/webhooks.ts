import { webhooks_db } from "../db";
import { Webhook } from "../interfaces/repository/webhooks";

/**
 * Retrieves all the needed information associated to a webhook record
 * 
 * @param userId - user id
 * @param event - event pattern
 */
async function getWebhookById(userId: number, event: string): Promise<Webhook[]> {
    const sql_query: string = `
    SELECT
        w.id,
        w.user_id,
        w.event_pattern,
        w.webhook_url,
        w.headers,
        w.payload,
        w.method,
        w.attempts
    FROM webhooks w
    WHERE w.user_id = ${userId}
    AND w.event_pattern = '${event}'
    AND w.active = true
    ;
    `
    const webhooks = await webhooks_db.raw(sql_query);
    return webhooks.rows
}

export { 
    getWebhookById 
}