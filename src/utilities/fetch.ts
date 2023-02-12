import axios from 'axios';
import { send_generic_message_notification } from '../utilities/notifications';

async function sendHttpNotification(url: string, method:string, data: object, config: object) {
    if (method === 'POST') {
        try {
            await axios.post(
                url,
                data,
                config
            )
        } catch (error: any) {
            send_generic_message_notification(
                'Error at sending webhook 🔴',
                'A invalid response has benn raised from the remote server',
                [{
                    name: "payload", 
                    value: JSON.stringify(data)
                }, 
                {
                    name: "url",
                    value: url
                }, 
                {
                    name: "response",
                    value: JSON.stringify(error.response.data)
                }]
            );
            throw new Error(`[x] Error 003 user_id or event not found`);
        }
    }
}

export {
    sendHttpNotification
}