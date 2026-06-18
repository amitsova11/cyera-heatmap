import React from 'react';
import { HeatmapLegendBox } from './HeatmapLegendBox';

const legendItems = [
    { numScans: 0, maxScans: 100, label: '0 scans' },
    { numScans: 25, maxScans: 100, label: '1-25% of max scans' },
    { numScans: 50, maxScans: 100, label: '26-50% of max scans' },
    { numScans: 75, maxScans: 100, label: '51-75% of max scans' },
    { numScans: 100, maxScans: 100, label: '76-100% of max scans' },
];

interface LegendProps {
    activeLevel: string | null;
    onLevelHover: (level: string | null) => void;
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