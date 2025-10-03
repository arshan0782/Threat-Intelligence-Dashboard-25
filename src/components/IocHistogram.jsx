import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// IocHistogram component
const IocHistogram = ({ histogramData, colors, widgetClasses }) => {
  return (
    // Container for the histogram widget
    <div className={`${widgetClasses} rounded-lg p-5 h-[500px]`}>
      <h3 className="text-lg font-semibold mb-4">IOC Distribution By Souce & Value </h3>
      {/* Responsive chart container */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogramData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#e72020",
              borderRadius: "8px",
              borderColor: "#ccc",
              color: "#fff",
            }}
          />
          <Legend />

          <Bar dataKey="source">
            {histogramData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IocHistogram;
