import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface HistogramData {
  name: string;
  value: number;
}

interface IocHistogramProps {
  pieData: HistogramData[];
  colors: string[];
  widgetClasses: string;
}

const IocHistogram = ({
  pieData,
  colors,
  widgetClasses,
}: IocHistogramProps) => {
  return (
    <div className={`${widgetClasses} rounded-lg p-6 h-[400px]`}>
      <h3 className="text-lg font-semibold mb-4">IOC Distribution By Value </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={pieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {pieData.map((_, index) => (
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
