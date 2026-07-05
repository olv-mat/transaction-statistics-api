import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { TransactionModule } from './src/modules/transaction/transaction.module';

@Module({
  imports: [TransactionModule, LoggerModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
