"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { getAdminCharts } from "@/lib/api/admin/data";

import {
  ResponsiveContainer,
  AreaChart, // LineChart এর বদলে AreaChart ব্যবহার করা হয়েছে লাক্সারি ইফেক্টের জন্য
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#B342F2", // Radiant Purple
  "#F242C2", // Neon Pink
  "#10B981", // Emerald Green
  "#3B82F6", // Blue
  "#F59E0B", // Amber
  "#EF4444", // Red
];

// 🔥 CUSTOM GLOSSY TOOLTIP COMPONENT
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0E0E16]/90 backdrop-blur-md border border-[#27273A] p-3 rounded-xl shadow-xl">
        <p className="text-gray-400 text-xs font-mono mb-1">{label}</p>
        <p className="text-white font-bold text-sm">
          {payload[0].name}:{" "}
          <span className="text-[#B342F2]">
            {typeof payload[0].value === "number" && payload[0].name.toLowerCase().includes("sales") 
              ? `$${payload[0].value.toLocaleString()}` 
              : payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminChartPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharts = async () => {
      try {
        const res = await getAdminCharts();
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCharts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 w-full">
        <Spinner color="secondary" label="Loading Visual Analytics..." />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 mt-4 px-2 sm:px-4 md:px-0">
      <DashboardHeading
        title="Charts & Reports"
        description="Visual data insights and performance of ArtHub"
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        
        {/* 🔥 SALES OVERVIEW (WITH AREA GRADIENT SHADOW) */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-5 md:p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="mb-6">
            <h2 className="text-white text-base font-bold tracking-wide">Sales Overview</h2>
            <p className="text-xs text-gray-400 mt-0.5">Monthly revenue generated from artwork sales</p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Neon Glow Gradient */}
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B342F2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#B342F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27273A/30" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B6B80" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#6B6B80" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-5}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#27273A', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Total Sales"
                  stroke="#B342F2"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 🔥 ARTWORKS BY CATEGORY (DONUT STYLE WITH GLOSSY LEGEND) */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-5 md:p-6 rounded-2xl shadow-lg">
          <div className="mb-6">
            <h2 className="text-white text-base font-bold tracking-wide">Artworks by Category</h2>
            <p className="text-xs text-gray-400 mt-0.5">Distribution of uploaded items across categories</p>
          </div>

          <div className="h-[350px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.categoryChart}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={85} // ডোনাট লুক দেওয়ার জন্য ইনার রেডিয়াস যোগ করা হয়েছে
                  outerRadius={120}
                  paddingAngle={4}
                  stroke="#12121C"
                  strokeWidth={3}
                >
                  {data?.categoryChart?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-gray-300 font-medium tracking-wide px-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}