import Redis from 'ioredis';

const redis = new Redis(
    process.env.REDIS_URL
);
redis.ping().then(console.log).catch(console.error);

export default redis;