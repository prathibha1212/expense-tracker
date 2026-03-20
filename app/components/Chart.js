"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Chart({ income, expense }) {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(expense) },
  ];

  const COLORS = ["#00C49F", "#FF4C4C"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}