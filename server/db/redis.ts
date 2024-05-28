import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

class RedisClient {
    private _redisService;

    constructor() {
        this._redisService = new Redis({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });
    }

    public initRedisClient() {
        this._redisService.on('connect', () => {
            console.log('REDIS CONNECTION SUCCESSFULLY 🔥')
        })

        this._redisService.on('error', (err) => {
            console.log(`ERROR OCCURED ${err}`)
        })
    }

    get redis() {
        return this._redisService;
    }
}

export default new RedisClient();
export const { redis } = new RedisClient();