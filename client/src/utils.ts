export enum HeatmapLevel {
  None = 'None',
  Low = 'Low',
  MediumLow = 'MediumLow',
  MediumHigh = 'MediumHigh',
  High = 'High',
}

export const getHeatmapColorClass = (count: number, maxScans: number) => {
  if (count === 0 || maxScans === 0) return 'color1';
  const pct = count / maxScans;
  if (pct <= 0.25) return 'color2';
  if (pct <= 0.5) return 'color3';
  if (pct <= 0.75) return 'color4';
  return 'color5';
};

export const getHeatmapLevel = (count: number, maxScans: number): HeatmapLevel => {
  const colorClass = getHeatmapColorClass(count, maxScans);

  if (colorClass === 'color1') {
    return HeatmapLevel.None;
  }

  if (colorClass === 'color2') {
    return HeatmapLevel.Low;
  }

  if (colorClass === 'color3') {
    return HeatmapLevel.MediumLow;
  }

  if (colorClass === 'color4') {
    return HeatmapLevel.MediumHigh;
  }

  return HeatmapLevel.High;
};
