import {Job, DoneCallback } from "bull";
import { RabbitClient } from "../amqp";
import { config } from "../config";
import { send_rabbit_connection_notification } from "../utilities/amqp";

function reconectAmqpClient(job: Job, done: DoneCallback) {
    console.log('[x] Recconecting to RabbitMQ client...');
    RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue);
    send_rabbit_connection_notification();
    done();
}

export {
    reconectAmqpClient
}