import { DateTime } from 'luxon';

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

  /**
   * @todo Adicionar regra
   * Regra adicional, no intervalo entre 22h e 5h a contagem de tempo deve ser diferenciada, deve se contar 1h a cada 52 min e 30 segundo, de tal forma que esse período de 7 horas, entre nos cálculos como 8h.
   */

  const totalDiff = finalDateTime.diff(initialDateTime, 'seconds');

  return {
    isValid: true,
    total: totalDiff.seconds,
  };
};

export const formatSecondsToHHMMSS = (secondsToTransform: number) => {
  const hour = Math.floor(secondsToTransform / 60 / 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((secondsToTransform / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsToTransform % 60).toString().padStart(2, '0');

  return `${hour}h ${minutes}m ${seconds}s`;
};
