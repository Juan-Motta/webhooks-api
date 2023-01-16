import { DataSource } from "typeorm";

import { config } from "./config";

const ServiceDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: config.service_db.host,
    username: config.service_db.user,
    password: config.service_db.password,
    port: config.service_db.port,
    database: config.service_db.database,
    entities: [],
    logging: config.sql_debug
})

export {
    ServiceDataSource
}