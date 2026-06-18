import React from 'react';
import { getHeatmapColorClass, getHeatmapLevel, HeatmapLevel } from '../utils';

interface HeatmapLegendBoxProps {
  numScans: number;
  maxScans: number;
  activeLevel?: HeatmapLevel | null;
  onHoverLevel: (level: HeatmapLevel | null) => void;
}

export const HeatmapLegendBox: React.FC<HeatmapLegendBoxProps> = ({
  numScans,
  maxScans,
  activeLevel,
  onHoverLevel,
}: HeatmapLegendBoxProps) => {
  const level = getHeatmapLevel(numScans, maxScans);
  const colorClass = getHeatmapColorClass(numScans, maxScans);
  const isActiveFilter = activeLevel != null;
  const isMatch = activeLevel === level;
  const isDimmed = isActiveFilter && !isMatch;

  return (
    <div
      className={`heatmap-box heatmap-legend-box ${colorClass}${
        isDimmed ? ' heatmap-box-dimmed' : ''
      }${isMatch ? ' heatmap-box-highlighted' : ''}`}
      onMouseEnter={() => onHoverLevel(level)}
      onMouseLeave={() => onHoverLevel(null)}
    />
  );
};
