import React from 'react';

interface HeatmapBoxProps {
  numScans: number;
}

export const HeatmapBox: React.FC<HeatmapBoxProps> = ({ numScans }: HeatmapBoxProps) => {
  const getColor = (count: number) => {
    if (count === 0) return '#ebedf0';
    if (count === 1) return '#c6e48b';
    if (count === 2) return '#7bc96f';
    if (count === 3) return '#239a3b';
    return '#196127';
  };

  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: getColor(numScans),
        borderRadius: '4px',
        margin: '2px',
      }}
      title={`${numScans} scan${numScans !== 1 ? 's' : ''}`}
    />
  );
}