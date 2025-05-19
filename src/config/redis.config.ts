import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private client: Redis;

  constructor() {
    const host = process.env.REDIS_HOST;
    const port = parseInt(process.env.REDIS_PORT || '6379');
    const password = process.env.REDIS_PASSWORD;

    if (!host) {
      throw new Error('[redis] Missing Redis configuration');
    }

    Logger.log(`[redis] Connecting to ${host}:${port}`);

    this.client = new Redis({
      host,
      port,
      tls: {
        rejectUnauthorized: false,
      },
      retryStrategy: (times) => Math.min(times * 100, 3000), 
    });

    this.client.on('connect', () => {
      Logger.log('[redis] Connected successfully');
    });

    this.client.on('error', (err) => {
      Logger.error(`[redis] Connection error: ${err.message}`);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
    Logger.log('[redis] Disconnected');
  }
}
