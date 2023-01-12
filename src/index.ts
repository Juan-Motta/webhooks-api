import express, { Application } from 'express';
import cors from 'cors';
import { RabbitClient } from './amqp';

import { config } from './config';

const app: Application = express();

app.use(cors());
app.use(express.json());

RabbitClient(`amqp://${config.rabbit.host}:${config.rabbit.port}`, config.rabbit.queue);

app.listen( config.port ,() => {
    console.log(`Server running on port ${config.port}`);
})