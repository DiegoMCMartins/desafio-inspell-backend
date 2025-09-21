import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { PeriodRepository } from './entities/period.entity';

@Module({
  controllers: [PeriodsController],
  providers: [PeriodsService, PeriodRepository],
  exports: [PeriodsService],
})
export class PeriodsModule {}
