import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor = false }) => {
  // Ensure we have valid data
  const validData = data && data.filter(item => item.amount > 0);
  
  // If no valid data, show empty state
  if (!validData || validData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  // Define custom colors for the pie chart segments
  const COLORS = colors || ["#59168B", "#a0090e", "#016630"];

  // Custom renderer for the center label
  const renderCustomizedLabel = ({ cx, cy, innerRadius }) => {
    return (
      <g>
        <text x={cx} y={cy - 15} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '20px', fontWeight: '500' }}>
          {label}
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '28px', fontWeight: '700' }}>
          {totalAmount}
        </text>
      </g>
    );
  };

  // Custom renderer for the legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center items-center gap-8 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div style={{ backgroundColor: entry.color, width: '12px', height: '12px', borderRadius: '50%' }} />
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col mt-6">
      <ResponsiveContainer width="100%" height="100%" minHeight={280}>
        <PieChart>
          <Pie
            data={validData}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={showTextAnchor ? renderCustomizedLabel : null}
            outerRadius={140}
            innerRadius={105}
            fill="#8884d8"
            dataKey="amount"
            nameKey="name"
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend content={CustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
