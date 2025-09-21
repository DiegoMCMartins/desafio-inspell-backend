import { DateTime, Interval } from 'luxon';

export const calculateSecondsBetweenPeriods = (params: {
  initialPeriod: string;
  finalPeriod: string;
}) => {
  const initialDateTime = DateTime.fromISO(params?.initialPeriod);
  const finalDateTime = DateTime.fromISO(params?.finalPeriod);

  if (!initialDateTime.isValid || !finalDateTime.isValid) {
    return {
      isValid: false,
      error:
        'Periodo inicial ou final inválidos, envie no formate YYYY-MM-DD:HH:mm:ss',
    };
  }

  if (finalDateTime.toMillis() < initialDateTime.toMillis()) {
    return {
      isValid: false,
      error: 'A data final não pode ser anterior à data inicial',
    };
  }

  /** Transformar o calculo de 7 horas para 8 horas no periodo */
  const nightMultiplier = 8 / 7;

  /** Intervalo principal informado */
  const mainInterval = Interval.fromDateTimes(initialDateTime, finalDateTime);
  let totalNightSeconds = 0;

  /** Cursor para iteração entre o periodo informado */
  let cursor = initialDateTime.startOf('day');

  while (cursor < finalDateTime) {
    /** Marca o inicio do periodo noturno */
    const nightStartDateTime = cursor.set({ hour: 22 });

    /** Marca o final do periodo noturno */
    const nightFinalDateTime = cursor.plus({ day: 1 }).set({ hour: 5 });

    /** Cria  o intervalo do periodo noturno */
    const nightInterval = Interval.fromDateTimes(
      nightStartDateTime,
      nightFinalDateTime,
    );

    /**
     * Se o intervalo principal possui interseção com o periodo noturno
     * Caso haja a interseção, é calculado o total de segundos desse periodo
     */
    if (mainInterval.overlaps(nightInterval)) {
      const intervalsIntersection = mainInterval.intersection(nightInterval);

      if (intervalsIntersection) {
        totalNightSeconds +=
          intervalsIntersection.toDuration('seconds').seconds;
      }
    }

    /** Passa para outro dia do periodo informado */
    cursor = cursor.plus({ day: 1 });
  }

  /** Segundos totais do periodo informado */
  const mainTotalSeconds = mainInterval.toDuration('seconds').seconds;

  /** Segundos totais do periodo diurno */
  const dayTotalSeconds = mainTotalSeconds - totalNightSeconds;

  /** Segundos totais normalizados do periodo noturno */
  const normalizedNightTotalSeconds = totalNightSeconds * nightMultiplier;

  /** Segundo totais reais, periodo diurno + periodo noturno */
  const totalSeconds = dayTotalSeconds + normalizedNightTotalSeconds;

  return {
    isValid: true,
    total: totalSeconds,
  };
};

export const formatSecondsToHHMMSS = (secondsToTransform: number) => {
  const hour = Math.floor(secondsToTransform / 60 / 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((secondsToTransform / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(secondsToTransform % 60)
    .toString()
    .padStart(2, '0');

  return `${hour}h ${minutes}m ${seconds}s`;
};
