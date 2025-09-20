import { DateTime, Interval } from 'luxon';
import { calculateSecondsBetweenPeriods } from '../utils';

let PERIODS: { initialPeriod: string; finalPeriod: string }[] = [];
let TOTAL_SECONDS_ACCUMULATED = 0;

export class PeriodRepository {
  savePeriods(payload: { initialPeriod: string; finalPeriod: string }) {
    const total_seconds = calculateSecondsBetweenPeriods(payload);

    if (!total_seconds.isValid) {
      throw new Error(total_seconds.error);
    }

    /**
     * Verificar se o periodo inicial ou final está entre alguma periodo salvo
     * Caso esteja, retorna um erro, por conta que não pode haver periodos cruzados
     */
    const hasSomeCrossedPeriods = PERIODS.some(
      ({ initialPeriod, finalPeriod }) => {
        const savedInterval = Interval.fromDateTimes(
          DateTime.fromISO(initialPeriod),
          DateTime.fromISO(finalPeriod),
        );
        const newInterval = Interval.fromDateTimes(
          DateTime.fromISO(payload.initialPeriod),
          DateTime.fromISO(payload.finalPeriod),
        );

        console.log(savedInterval, newInterval, newInterval.intersection(savedInterval));

        return newInterval.intersection(savedInterval);

        // const savedInitialDateTime = DateTime.fromISO(initialPeriod);
        // const savedFinalDateTime = DateTime.fromISO(initialPeriod);

        // const newInitialDateTime = DateTime.fromISO(payload.initialPeriod);
        // const newFinalDateTime = DateTime.fromISO(payload.initialPeriod);
      },
    );

    if (hasSomeCrossedPeriods) {
      throw new Error(
        'O novo periodo não pode cruzar com outro periodo informado',
      );
    }

    PERIODS.push(payload);
    TOTAL_SECONDS_ACCUMULATED += total_seconds.total || 0;
  }

  findTotalSeconds() {
    return TOTAL_SECONDS_ACCUMULATED;
  }

  findAllPeriods() {
    return PERIODS;
  }

  removeAll() {
    PERIODS = [];
    TOTAL_SECONDS_ACCUMULATED = 0;
  }
}
