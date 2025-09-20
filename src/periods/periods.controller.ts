import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { RegisterPeriodDto } from './dto/register-period.dto';

@Controller('periodos')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  register(@Body() registerPeriodDto: RegisterPeriodDto) {
    return this.periodsService.register(registerPeriodDto);
  }

  @Get()
  findAll() {
    return this.periodsService.findAll();
  }

  @Get('total')
  findTotal() {
    return this.periodsService.findTotal();
  }

  @Delete()
  removeAll() {
    return this.periodsService.removeAll();
  }
}
