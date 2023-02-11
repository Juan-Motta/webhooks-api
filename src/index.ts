import { config } from './config';
import { RabbitClient } from './amqp';
import { app } from './app';

/**
 * Starts the main function that is in charge of creating the rabbit listener instance that is
 * goint to run in background waiting for all messages, also it starts the express server
 */
async function main() {

    await RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue)
    
    app.listen( config.port ,() => {
        console.log(`[X] Server running on port ${config.port}`);
    })
}

main();