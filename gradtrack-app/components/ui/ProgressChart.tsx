"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface ChartDataPoint {
  [key: string]: string | number | null | undefined;
}

interface ProgressChartProps {
  data: ChartDataPoint[];
  dataKey: string;
  xAxisKey: string;
  title: string;
  type?: 'bar' | 'line';
  color?: string;
  height?: number;
}

export function ProgressChart({
  data,
  dataKey,
  xAxisKey,
  title,
  type = 'bar',
  color = '#3b82f6',
  height = 300,
}: ProgressChartProps) {
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataPoint; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-slate-700">
            {payload[0].payload[xAxisKey]}
          </p>
          <p className="text-sm text-slate-600">
            {typeof payload[0].value === 'number'
              ? payload[0].value.toFixed(1)
              : payload[0].value}{' '}
            hours
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey={xAxisKey}
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey={xAxisKey}
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
