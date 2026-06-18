import { useMemo } from 'react';
import { ScanDto } from '../../../common/dtos/scan.dto';
import { HeatmapBox } from './HeatmapBox';

interface HeatmapProps {
  scans: ScanDto[];
}

export const Heatmap = ({ scans }: HeatmapProps) => {
  const scansByYearAndDay = useMemo(() => {
    const groupedScans = new Map<number, Map<string, number>>();

    scans.forEach((scan) => {
      const scanDate = new Date(scan.date);
      if (Number.isNaN(scanDate.getTime())) {
        return;
      }

      const year = scanDate.getUTCFullYear();
      const dayKey = scanDate.toISOString().slice(0, 10);

      if (!groupedScans.has(year)) {
        groupedScans.set(year, new Map<string, number>());
      }

      const yearGroup = groupedScans.get(year)!;
      yearGroup.set(dayKey, (yearGroup.get(dayKey) ?? 0) + 1);
    });

    return Array.from(groupedScans.entries())
      .sort(([aYear], [bYear]) => aYear - bYear)
      .map(([year, dayMap]) => ({
        year,
        days: Array.from(dayMap.entries())
          .sort(([aDay], [bDay]) => aDay.localeCompare(bDay))
          .map(([day, count]) => ({ day, count })),
      }));
  }, [scans]);

  if (!scansByYearAndDay.length) {
    return <div>no scans found</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
      {scansByYearAndDay.map((yearGroup) =>{
        return yearGroup.days.map((day) => {   
          return <HeatmapBox key={day.day} numScans={day.count} />;
        });
      })}
    </div>
  );
};
