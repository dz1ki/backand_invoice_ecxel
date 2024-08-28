import { NestFactory } from '@nestjs/core';
import { ExcelModule } from './module/main.module';

async function start() {
  await NestFactory.createApplicationContext(ExcelModule);
}
start();
