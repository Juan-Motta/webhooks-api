import {Job, DoneCallback } from "bull";
import { RabbitClient } from "../amqp";
import { config } from "../config";

function reconectAmqpClient(job: Job, done: DoneCallback) {
    console.log('[x] Recconecting to RabbitMQ client...');
    RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue);
    done();
}

export {
    reconectAmqpClient
}