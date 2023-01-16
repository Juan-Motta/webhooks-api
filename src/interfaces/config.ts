interface Config {
    debug: boolean,
    sql_debug: boolean,
    version: string,
    port: number,
    enviroment: string,
    service_db: DbConfig,
    webhooks_db: DbConfig,
    rabbit: RabbitConfig,
    redis_queue: RedisQueue,
    discord_url: string
}

interface DbConfig {
    host: string,
    database: string,
    user: string,
    password: string,
    port: number
}

interface RabbitConfig {
    host: string,
    user: string,
    password: string,
    port: number,
    queue: string,
    reconnection_delay: number
}

interface RedisQueue {
    host: string,
    port: number,
    db: number
}

export {
    Config,
    DbConfig
}