import { useMemo, useState } from 'react';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { HeatmapBox } from './HeatmapBox';
import { Legend } from './Legend';
import { HeatmapLevel } from '../utils';

interface HeatmapProps {
  scans: ScanDto[];
}

export const Heatmap = ({ scans }: HeatmapProps) => {
  const [hoveredLevel, setHoveredLevel] = useState<HeatmapLevel | null>(null);

  const scansByYearMonthAndDay = useMemo(() => {
    // find yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    // create years => months => days => count structure
    const groupedScans = new Map<number, Map<string, Map<string, number>>>();

    scans.forEach((scan) => {
      const scanDate = new Date(scan.date);

      if (Number.isNaN(scanDate.getTime())) {
        return;
      }

      const year = scanDate.getUTCFullYear();
      const monthKey = scanDate.toISOString().slice(0, 7);
      const dayKey = scanDate.toISOString().slice(8, 10);

      if (!groupedScans.has(year)) {
        groupedScans.set(year, new Map<string, Map<string, number>>());
      }

      const yearGroup = groupedScans.get(year)!;

      if (!yearGroup.has(monthKey)) {
        yearGroup.set(monthKey, new Map<string, number>());
      }

      const monthGroup = yearGroup.get(monthKey)!;
      monthGroup.set(dayKey, (monthGroup.get(dayKey) ?? 0) + 1);
    });

    // sort and fill in missing days
    return Array.from(groupedScans.entries())

      .sort(([aYear], [bYear]) => aYear - bYear)
      
      .map(([year, monthMap]) => {
        let maxDay: string | null = null;
        let maxCount = 0;

        const months = Array.from({ length: 12 }, (_, i) => {
          const monthKey = `${year}-${String(i + 1).padStart(2, '0')}`;
          const dayMap = monthMap.get(monthKey) ?? new Map<string, number>();
          const daysInMonth = new Date(year, i + 1, 0).getDate();
          // if current month, then change daysin month to yesterday's day
          const days = Array.from({ length: daysInMonth }, (_, d) => {
            const dayKey = String(d + 1).padStart(2, '0');
            return { day: dayKey, count: dayMap.get(dayKey) ?? 0 };
          }).filter(({ day }) => `${monthKey}-${day}` <= yesterdayKey);

          days.forEach(({ day, count }) => {
            if (count > maxCount) {
              maxCount = count;
              maxDay = `${monthKey}-${day}`;
            }
          });

          return { month: monthKey, days };
        });

        return { year, months, maxDay, maxCount };
      });
  }, [scans]);

  if (!scansByYearMonthAndDay.length) {
    return <div>no scans found</div>;
  }

  return (
    <div className="heatmap-grid">
      {scansByYearMonthAndDay.map((yearGroup) => {
        return yearGroup.months.map((monthGroup) => {
          return (
            <div className="heatmap-month-row" key={`${yearGroup.year}-${monthGroup.month}`}>
              {monthGroup.days.map((day) => {
                return (
                  <HeatmapBox
                    key={`${yearGroup.year}-${monthGroup.month}-${day.day}`}
                    date={`${monthGroup.month}-${day.day}`}
                    numScans={day.count}
                    maxScans={yearGroup.maxCount}
                    activeLevel={hoveredLevel}
                  />
                );
              })}
            </div>
          );
        });
      })}
      <Legend activeLevel={hoveredLevel} onLevelHover={setHoveredLevel} />
    </div>
  );
};
