import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: "default",
    password: process.env.REDIS_PASSWORD,
    tls: {}
});

export default redis;