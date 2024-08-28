import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvoiceGenerate } from '../jobs/index.';
import * as config from 'config';
import { HttpModule } from '@nestjs/axios';
import { InvoiceSender } from '../service/sender.status';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: config.get('redisConfig.host'),
        port: config.get('redisConfig.port'),
        password: config.get('redisConfig.password'),
        database: config.get('redisConfig.database'),
      },
    }),

    BullModule.registerQueue({
      name: 'Invoice',
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [InvoiceGenerate, InvoiceSender],
})
export class ExcelModule {}
