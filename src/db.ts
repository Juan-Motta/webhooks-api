import knex from "knex";
import { config } from "./config";

const services_db = knex({
    client: 'pg',
    connection: {
        host: config.service_db.host,
        port: config.service_db.port,
        user: config.service_db.user,
        password: config.service_db.password,
        database: config.service_db.database
    }
});

console.log(`[X] Database connected to ${config.service_db.database}`);

const webhooks_db = knex({
    client: 'pg',
    connection: {
        host: config.webhooks_db.host,
        port: config.webhooks_db.port,
        user: config.webhooks_db.user,
        password: config.webhooks_db.password,
        database: config.webhooks_db.database
    }
});

console.log(`[X] Database connected to ${config.webhooks_db.database}`);

export { 
    services_db, 
    webhooks_db 
};