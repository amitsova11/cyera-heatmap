import React from 'react';

interface HeatmapBoxProps {
  numScans: number;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({ numScans }: HeatmapBoxProps) => {
  const getColorClass = (count: number) => {
    if (count === 0) return 'color1';
    if (count === 1) return 'color2';
    if (count === 2) return 'color3';
    if (count === 3) return 'color4';
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