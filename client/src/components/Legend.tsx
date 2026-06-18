import React from 'react';
import { HeatmapLegendBox } from './HeatmapLegendBox';
import { HeatmapLevel } from '../utils';

const legendItems = [
    { numScans: 0, maxScans: 100 },
    { numScans: 25, maxScans: 100 },
    { numScans: 50, maxScans: 100 },
    { numScans: 75, maxScans: 100 },
    { numScans: 100, maxScans: 100},
];

interface LegendProps {
    activeLevel: HeatmapLevel | null;
    onLevelHover: (level: HeatmapLevel | null) => void;
}

export const Legend: React.FC<LegendProps> = ({ activeLevel, onLevelHover }) => {
    return (
        <div
            className="legend"
            onMouseLeave={() => onLevelHover(null)}
        >
            <span className="legend-label legend-label-less">Less</span>
            {legendItems.map((item, index) => (
                <div key={index} className="legend-item">
                    <HeatmapLegendBox
                        numScans={item.numScans}
                        maxScans={item.maxScans}
                        activeLevel={activeLevel}
                        onHoverLevel={onLevelHover}
                    />
                </div>
            ))}
            <span className="legend-label legend-label-more">More</span>
        </div>
    );
};