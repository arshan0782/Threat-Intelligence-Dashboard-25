import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const IocPieChart = ({ pieChartData, colors, widgetClasses }) => {
  return (
    // Container for the pie chart widget
    <div className={`${widgetClasses} rounded-lg  p-6 h-[400px]`}>
      {/* Title for the chart */}
      <h3 className="text-lg font-semibold mb-1000">IOC Distribution By Type</h3>
      {/* Responsive chart container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Pie element with dynamic colors for each cell */}
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
          >
            {pieChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {/* Tooltip for hover info */}
          <Tooltip />
          {/* Legend for chart labels */}
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            wrapperStyle={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#aaaaaa',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IocPieChart;