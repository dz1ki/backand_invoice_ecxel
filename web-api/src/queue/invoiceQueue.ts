import { Queue } from "bullmq";
import * as config from "config";
export const invoiceQueue = new Queue("Invoice", {
  connection: {
    host: config.get("redisConfig.host"),
    port: config.get("redisConfig.port"),
    password: config.get("redisConfig.password"),
    database: config.get("redisConfig.database"),
  },
});
