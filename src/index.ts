import 'reflect-metadata';

import { config } from './config';
import { ServiceDataSource } from './db';
import { RabbitClient } from './amqp';
import { app } from './app';

async function main() {

    await ServiceDataSource.initialize();
    await RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue);
    
    app.listen( config.port ,() => {
        console.log(`[X] Server running on port ${config.port}`);
    })
}

main();