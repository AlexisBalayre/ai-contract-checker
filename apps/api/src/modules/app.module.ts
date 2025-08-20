import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ContractsController } from '../controllers/contracts.controller';
import { ContractsModule } from './contracts.module';


@Module({
  imports: [ContractsModule],
  controllers: [AppController, ContractsController],
  providers: [AppService],
})
export class AppModule {}
