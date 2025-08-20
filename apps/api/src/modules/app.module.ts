import { Module } from '@nestjs/common';
import { HealthService } from '@src/services';
import { HealthController } from '@src/controllers';
import { ContractsModule } from '@src/modules';
import { ContractsController } from '@src/controllers';
import { ContractsService } from '@src/services';

@Module({
  imports: [ContractsModule],
  controllers: [HealthController, ContractsController],
  providers: [HealthService, ContractsService],
})
export class AppModule {}