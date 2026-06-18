import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface HeatmapBoxProps {
  date: string;
  numScans: number;
  maxScans: number;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({ date, numScans, maxScans }: HeatmapBoxProps) => {
  const getColorClass = (count: number) => {
    if (count === 0 || maxScans === 0) return 'color1';
    const pct = count / maxScans;
    if (pct <= 0.25) return 'color2';
    if (pct <= 0.5) return 'color3';
    if (pct <= 0.75) return 'color4';
    return 'color5';
  };

  return (
    <Tooltip title={`${date}: ${numScans} scan${numScans !== 1 ? 's' : ''}`} arrow>
      <div
        className={getColorClass(numScans)}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          margin: '2px',
          cursor: 'pointer',
        }}
      />
    </Tooltip>
  );
}