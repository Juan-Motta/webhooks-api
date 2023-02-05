import Queue, { Queue as QueueInterface} from "bull";
import { config } from "./config";

/**
 * Sets up a bull queue instance and connects it to redis
 */
const bull: QueueInterface = new Queue(
    'queue',
    {
        redis: {
            host: config.redis_queue.host,
            port: config.redis_queue.port,
            db: config.redis_queue.db
        }
    }
);

console.log('[x] Bull ... OK');

export { bull }