import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterPeriodDto } from './dto/register-period.dto';
import { calculateSecondsBetweenPeriods, formatSecondsToHHMMSS } from './utils';
import { PeriodRepository } from './entities/period.entity';

@Injectable()
export class PeriodsService {
  constructor(private readonly periodRepository: PeriodRepository) {}

  register(registerPeriodDto: RegisterPeriodDto) {
    const totalSeconds = calculateSecondsBetweenPeriods({
      initialPeriod: registerPeriodDto?.dataInicial,
      finalPeriod: registerPeriodDto?.dataFinal,
    });

    if (!totalSeconds.isValid) {
      throw new BadRequestException(totalSeconds.error);
    }

    try {
      this.periodRepository.savePeriods({
        initialPeriod: registerPeriodDto.dataInicial,
        finalPeriod: registerPeriodDto.dataFinal,
      });
    } catch (error) {
      throw new BadRequestException((error as Error)?.message);
    }

    return {
      duracaoSegundos: totalSeconds.total,
    };
  }

  findAll() {
    const periods = this.periodRepository.findAllPeriods();

    const formattedPeriods = periods.map((period) => {
      const totalSeconds = calculateSecondsBetweenPeriods(period);

      return {
        dataInicial: period.initialPeriod,
        dataFinal: period.finalPeriod,
        duracaoSegundos: totalSeconds.total,
        duracaoFormatada: formatSecondsToHHMMSS(totalSeconds.total || 0),
      };
    });

    return formattedPeriods;
  }

  findTotal() {
    const totalSeconds = this.periodRepository.findTotalSeconds();

    return {
      duracaoSegundos: totalSeconds,
      duracaoFormatada: formatSecondsToHHMMSS(totalSeconds || 0),
    };
  }

  removeAll() {
    this.periodRepository.removeAll();

    return;
  }
}
