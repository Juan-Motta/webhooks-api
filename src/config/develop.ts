import dotenv from 'dotenv';
import { Config } from '../interfaces/config';

dotenv.config({ path: `.env.develop`, override: true });

const config: Config = {
    debug: process.env.DEBUG!,
    version: process.env.VERSION!,
    port: parseInt(process.env.PORT!),
    enviroment: process.env.ENVIROMENT!,
    db: {
        host: process.env.DB_HOST!,
        database: process.env.DB_DATABASE!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        port: parseInt(process.env.DB_PORT!)
    },
    rabbit: {
        host: process.env.RABBIT_HOST!,
        user: process.env.RABBIT_USER!,
        password: process.env.RABBIT_PASSWORD!,
        port: parseInt(process.env.RABBIT_PORT!),
        queue: process.env.RABBIT_QUEUE!,
        reconnection_delay: parseInt(process.env.RABBIT_RECONNECTION_DELAY!)
    },
    redis_queue: {
        host: process.env.REDIS_QUEUE_HOST!,
        port: parseInt(process.env.REDIS_QUEUE_PORT!),
        db: parseInt(process.env.REDIS_QUEUE_DB!)
    },
    discord_url: process.env.DISCORD_URL!
};

export { config }