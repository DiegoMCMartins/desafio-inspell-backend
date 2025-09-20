import { Module } from '@nestjs/common';
import { PeriodsModule } from './periods/periods.module';

@Module({
  imports: [PeriodsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
