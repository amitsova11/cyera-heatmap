import React from 'react';
import { HeatmapBox } from './HeatmapBox';

const legendItems = [
    { numScans: 0, maxScans: 100, label: '0 scans' },
    { numScans: 25, maxScans: 100, label: '1-25% of max scans' },
    { numScans: 50, maxScans: 100, label: '26-50% of max scans' },
    { numScans: 75, maxScans: 100, label: '51-75% of max scans' },
    { numScans: 100, maxScans: 100, label: '76-100% of max scans' },
];

export const Legend: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Less</span>
            {legendItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <HeatmapBox
                        date="Legend"
                        numScans={item.numScans}
                        maxScans={item.maxScans}
                        showTooltip={false}
                    />
                </div>
            ))}
            <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>More</span>
        </div>
    );
};