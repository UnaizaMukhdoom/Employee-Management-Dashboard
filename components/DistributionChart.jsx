"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#9333ea", "#f97316", "#dc2626", "#6b7280"];

// Helper function: counts how many times each value appears in a list
function countByField(employees, getFieldValue) {
  const counts = {};
  employees.forEach((emp) => {
    const key = getFieldValue(emp);
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

function DistributionChart({ employees }) {
  // Step 1: Build data for the city bar chart
  const cityCounts = countByField(employees, (emp) => emp.address.city);
  const cityEntries = Object.entries(cityCounts);
  const cityData = cityEntries.map(([city, count]) => ({ city, count }));

  // Step 2: Build data for the company pie chart
  const companyCounts = countByField(employees, (emp) => emp.company.name);
  const companyEntries = Object.entries(companyCounts);
  const companyData = companyEntries.map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-sm font-semibold mb-3">Employees by City</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={cityData} margin={{ top: 10, right: 16, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="city"
              tick={{ fontSize: 11 }}
              angle={-30}
              textAnchor="end"
              interval={0}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-sm font-semibold mb-3">Employees by Company</h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={companyData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {companyData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: "11px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DistributionChart;