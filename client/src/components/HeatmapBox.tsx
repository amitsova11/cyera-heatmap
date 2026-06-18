import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface HeatmapBoxProps {
  date: string;
  numScans: number;
  maxScans: number;
  showTooltip?: boolean;
  activeLevel?: string | null;
  onHoverLevel?: (level: string | null) => void;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({
  date,
  numScans,
  maxScans,
  showTooltip = true,
  activeLevel,
  onHoverLevel,
}: HeatmapBoxProps) => {
  const getColorClass = (count: number) => {
    if (count === 0 || maxScans === 0) return 'color1';
    const pct = count / maxScans;
    if (pct <= 0.25) return 'color2';
    if (pct <= 0.5) return 'color3';
    if (pct <= 0.75) return 'color4';
    return 'color5';
  };

  const level = getColorClass(numScans);
  const isActiveFilter = activeLevel != null;
  const isMatch = activeLevel === level;
  const isDimmed = isActiveFilter && !isMatch;

  const box = (
    <div
      className={level}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '4px',
        margin: '2px',
        cursor: onHoverLevel ? 'pointer' : 'default',
        opacity: isDimmed ? 0.15 : 1,
        transform: isMatch ? 'scale(1.06)' : 'scale(1)',
        transition: 'opacity 120ms ease, transform 120ms ease',
      }}
      onMouseEnter={() => onHoverLevel?.(level)}
      onMouseLeave={() => onHoverLevel?.(null)}
    />
  );

  if (!showTooltip) {
    return box;
  }

  return (
    <Tooltip title={<div style={{fontSize: '15px'}}>{`${date}: ${numScans} scan${numScans !== 1 ? 's' : ''}`}</div>} arrow>
      {box}
    </Tooltip>
  );
}