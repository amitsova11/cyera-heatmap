export const getHeatmapLevel = (count: number, maxScans: number) => {
  if (count === 0 || maxScans === 0) return 'color1';
  const pct = count / maxScans;
  if (pct <= 0.25) return 'color2';
  if (pct <= 0.5) return 'color3';
  if (pct <= 0.75) return 'color4';
  return 'color5';
};
