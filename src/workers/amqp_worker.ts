import {Job, DoneCallback } from "bull";
import { RabbitClient } from "../amqp";
import { config } from "../config";
import { send_rabbit_connection_notification } from "../utilities/amqp";

/**
 * Function that is un charge of reconnect rabbitmq connection creating a new instance and
 * replacing the last one that was closed, it also sends a dicord notification indicating
 * that the new connection is setted up
 * 
 * @param job - instance job from queue
 * @param done - instance from queue that indicates when a job is done
 */
function reconectAmqpClient(job: Job, done: DoneCallback) {
    console.log('[x] Recconecting to RabbitMQ client...');
    RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue);
    send_rabbit_connection_notification();
    done();
}

export {
    reconectAmqpClient
}