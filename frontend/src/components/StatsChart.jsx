import React, { useEffect, useState } from "react";
import { fetchStats } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#FF4C4C", "#A0AEC0"];

function StatsChart() {
  const [stats, setStats] = useState({
    levelCounts: {},
    avgLogsPerSec: 0,
    errorRate: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await fetchStats({ duration: 60 });
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const barChartData = Object.entries(stats.levelCounts || {}).map(
    ([level, count]) => ({
      level,
      count,
    })
  );

  const errorRateData = [
    { name: "Error Logs", value: stats.errorRate },
    { name: "Other Logs", value: 1 - stats.errorRate },
  ];

  return (
    <div className="sm:p-6 md:p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Logs by Level
          </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-md">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Avg Logs / Sec
            </h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.avgLogsPerSec}
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Error Rate
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorRateData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {errorRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${(value * 100).toFixed(1)}%`,
                      name,
                    ]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsChart;
