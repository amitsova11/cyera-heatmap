import React from 'react';

interface HeatmapBoxProps {
  numScans: number;
  maxScans: number;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({ numScans, maxScans }: HeatmapBoxProps) => {
  const getColorClass = (count: number) => {
    if (count === 0 || maxScans === 0) return 'color1';
    const pct = count / maxScans;
    if (pct <= 0.25) return 'color2';
    if (pct <= 0.5) return 'color3';
    if (pct <= 0.75) return 'color4';
    return 'color5';
  };

  return (
    <div
      className={getColorClass(numScans)}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '4px',
        margin: '2px',
      }}
      title={`${numScans} scan${numScans !== 1 ? 's' : ''}`}
    />
  );
}