import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface PieData {
  name: string;
  value: number;
}

interface IocPieChartProps {
  pieData: PieData[];
  colors: string[];
  widgetClasses: string;
}

const IocPieChart = ({ pieData, colors, widgetClasses }: IocPieChartProps) => {
  return (
    <div className={`${widgetClasses} rounded-lg  p-6 h-[400px]`}>
      <h3 className="text-lg font-semibold mb-1000">IOC Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
          wrapperStyle={
            { marginTop: '10px',
              fontSize: '12px'

             }

          } />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IocPieChart;
