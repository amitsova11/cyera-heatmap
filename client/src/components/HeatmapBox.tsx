import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { getHeatmapLevel } from '../utils';

interface HeatmapBoxProps {
  date: string;
  numScans: number;
  maxScans: number;
  activeLevel?: string | null;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({
  date,
  numScans,
  maxScans,
  activeLevel,
}: HeatmapBoxProps) => {
  const level = getHeatmapLevel(numScans, maxScans);
  const isActiveFilter = activeLevel != null;
  const isMatch = activeLevel === level;
  const isDimmed = isActiveFilter && !isMatch;

  const box = (
    <div
      className={`heatmap-box ${level}${isDimmed ? ' heatmap-box-dimmed' : ''}${
        isMatch ? ' heatmap-box-highlighted' : ''
      }`}
    />
  );

  return (
    <Tooltip
      title={
        <div className="heatmap-tooltip-content">{`${date}: ${numScans} scan${numScans !== 1 ? 's' : ''}`}</div>
      }
      arrow
    >
      {box}
    </Tooltip>
  );
}