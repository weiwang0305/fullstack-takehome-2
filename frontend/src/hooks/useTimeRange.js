import { useMemo } from 'react';

const INTERVAL_MAP = {
  '1m': { minutes: 1, defaultRange: { days: 1 } },
  '3m': { minutes: 3, defaultRange: { days: 3 } },
  '5m': { minutes: 5, defaultRange: { days: 5 } },
  '15m': { minutes: 15, defaultRange: { days: 7 } },
  '30m': { minutes: 30, defaultRange: { days: 14 } },
  '1h': { hours: 1, defaultRange: { days: 30 } },
  '2h': { hours: 2, defaultRange: { days: 30 } },
  '4h': { hours: 4, defaultRange: { days: 60 } },
  '6h': { hours: 6, defaultRange: { days: 90 } },
  '8h': { hours: 8, defaultRange: { days: 90 } },
  '12h': { hours: 12, defaultRange: { days: 90 } },
  '1d': { days: 1, defaultRange: { days: 180 } },
  '3d': { days: 3, defaultRange: { days: 360 } },
  '1w': { days: 7, defaultRange: { days: 360 } },
  '1M': { months: 1, defaultRange: { days: 720 } },
};

export const useTimeRange = (interval = '1m') => {
  return useMemo(() => {
    const now = new Date();
    const endTime = now.getTime();

    // Get the default range for this interval
    const timeConfig = INTERVAL_MAP[interval] || INTERVAL_MAP['1m'];
    const { defaultRange } = timeConfig;

    // Calculate start time by subtracting the default range from current time
    const startTime = new Date(now);
    if (defaultRange.days) {
      startTime.setDate(startTime.getDate() - defaultRange.days);
    }

    return {
      startTime: startTime.getTime(),
      endTime,
    };
  }, [interval]);
};
