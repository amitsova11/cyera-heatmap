import React from 'react';
import { getHeatmapLevel } from '../utils';

interface HeatmapLegendBoxProps {
  numScans: number;
  maxScans: number;
  activeLevel?: string | null;
  onHoverLevel: (level: string | null) => void;
}

export const HeatmapLegendBox: React.FC<HeatmapLegendBoxProps> = ({
  numScans,
  maxScans,
  activeLevel,
  onHoverLevel,
}: HeatmapLegendBoxProps) => {
  const level = getHeatmapLevel(numScans, maxScans);
  const isActiveFilter = activeLevel != null;
  const isMatch = activeLevel === level;
  const isDimmed = isActiveFilter && !isMatch;

  return (
    <div
      className={`heatmap-box heatmap-legend-box ${level}${
        isDimmed ? ' heatmap-box-dimmed' : ''
      }${isMatch ? ' heatmap-box-highlighted' : ''}`}
      onMouseEnter={() => onHoverLevel(level)}
      onMouseLeave={() => onHoverLevel(null)}
    />
  );
};
