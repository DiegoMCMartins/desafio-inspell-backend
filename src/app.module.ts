import { Module } from '@nestjs/common';
import { PeriodsModule } from './periods/periods.module';
import { AppController } from './app.controller';

@Module({
  imports: [PeriodsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
