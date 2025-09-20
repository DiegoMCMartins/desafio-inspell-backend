import { Controller, Get } from '@nestjs/common';
import { PeriodsService } from './periods/periods.service';

@Controller('')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get('total')
  findTotalPeriods() {
    return this.periodsService.findTotal();
  }
}
