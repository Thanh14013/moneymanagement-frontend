import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomAmount = ({ data }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      // Extract category details directly from categoryDetails or categories
      let categoryDetails = [];
      
      if (data.categoryDetails && typeof data.categoryDetails === 'object') {
        // Convert from object to array format
        categoryDetails = Object.entries(data.categoryDetails).map(([name, amount]) => ({
          name,
          amount
        }));
      } else if (Array.isArray(data.categories)) {
        categoryDetails = data.categories;
      }
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium text-gray-800 mb-1">
            {data.formattedDate}
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-purple-700">
              Total: {data.totalAmount.toLocaleString()}đ
            </div>
            {/* Always show Details section if we have data */}
            <div className="text-sm text-gray-600">
              Details:
            </div>
            {/* Show all category details */}
            {categoryDetails.length > 0 ? (
              categoryDetails.map((category, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {category.name}: {category.amount.toLocaleString()}đ
                </div>
              ))
            ) : (
              // Fallback if no categories
              <div className="text-sm text-gray-600 italic">
                No detailed breakdown available
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot component for active point
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    // Show dots for all data points for better visibility
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill="#8b5cf6" 
        stroke="#ffffff" 
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="w-full h-80 p-4 bg-white rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="displayDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => {
              // Improve tick formatting based on value magnitude
              if (value >= 1000) {
                return `${Math.round(value / 1000)}k`;
              } else {
                return `${value}`;
              }
            }}
            // Ensure we show enough ticks for small amounts
            tickCount={5}
            // Allow the chart to determine reasonable min/max values
            domain={['auto', 'auto']}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#a855f7"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAmount)"
            dot={<CustomDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomAmount;